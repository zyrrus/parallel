import { MainLayout } from "@components/layouts";
import {
  Project,
  ProjectLifecycle,
  ProjectPreview,
  User,
} from "@prisma/client";
import { api } from "@utils/api";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import rehypeHighlight from "rehype-highlight";
import { serialize } from "next-mdx-remote/serialize";
import { prisma } from "@server/db";
import superjson from "superjson";
import { appRouter } from "@server/api/root";
import { getServerAuthSession } from "@server/auth";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { MDX } from "@components/MDX";
import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React, { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";

enum PageMode {
  visitor,
  member,
  editor,
  preview,
}

type FetchedProjectAsProps = {
  project:
    | (Project & {
        author: User;
        members: User[];
        previews: ProjectPreview[];
      })
    | null
    | undefined;
};

const StateOrder: ProjectLifecycle[] = Object.values(ProjectLifecycle);

const SpecificProject: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projectId, description }) => {
  const [mode, setMode] = useState(PageMode.visitor);

  const ctx = api.useContext();

  const { data, isRefetching } = api.projects.getProjectById.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      projectId,
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   const { mutate, isLoading: isUpdatingState } =
  //     api.projects.updateState.useMutation({
  //       onSuccess: () => {
  //         void ctx.projects.getProjectById.invalidate();
  //       },
  //     });

  //   const changeState = (diff: -1 | 1) => {
  //     if (!data) return;

  //     const newState =
  //       StateOrder[
  //         StateOrder.findIndex((state) => state === data.state) + diff
  //       ] ?? data.state;

  //     if (newState !== data.state) {
  //       mutate({
  //         projectId: data.id,
  //         state: newState,
  //       });
  //     }
  //   };

  //   TODO: Make edit mode do something
  const componentsByMode = {
    [PageMode.visitor]: (
      <DisplayProject project={data} description={description} />
    ),
    [PageMode.member]: (
      <DisplayProject project={data} description={description} />
    ),
    [PageMode.editor]: (
      <DisplayProject project={data} description={description} />
    ),
    [PageMode.preview]: (
      <DisplayProject project={data} description={description} />
    ),
  };

  return (
    <MainLayout>
      <div className="flex flex-row justify-between">
        <DisplayProject project={data} description={description} />
        {/* Right side panel */}
        <div className="sticky top-0 flex h-screen w-96 flex-row">
          <div className="w-1.5 border-x-2 border-x-fg/10" />
          <aside className="flex w-full flex-col gap-y-4 overflow-x-hidden px-11 py-8">
            <div>
              <h2 className="mb-2 font-bold text-primary text-r-4xl">
                Contributors
              </h2>
              <div className="flex flex-row gap-x-4">
                {/* TODO: Handle overflow */}
                <ProfilePicture
                  name={data?.author.name}
                  image={data?.author.image}
                />
                {data?.members.map((member) => (
                  <ProfilePicture name={member.name} image={member.image} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 font-bold text-primary text-r-4xl">
                Progress
              </h2>
              <ProjectProgress progress={data?.state} />
            </div>
            <div>
              <h2 className="mb-2 font-bold text-primary text-r-4xl">
                Messages
              </h2>
              <p>[Coming soon]</p>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpecificProject;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: superjson,
  });

  if (!ctx.params?.projectId)
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };

  const projectId = Array.isArray(ctx.params.projectId)
    ? ctx.params.projectId.join("")
    : ctx.params.projectId;

  const project = await ssg.projects.getProjectById.fetch({ projectId });
  const projectDescription = project?.description ?? "";
  const mdxSource = await serialize(projectDescription, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });

  return { props: { projectId, description: mdxSource } };
};

interface ProfilePictureProps {
  name: string | undefined | null;
  image: string | undefined | null;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ name, image }) => {
  return (
    <Avatar.Root className="flex min-w-max select-none items-center justify-center overflow-hidden rounded-full bg-quaternary p-2 align-middle shadow-solid-medium">
      <Avatar.Image
        className="h-10 w-10 rounded-[inherit] object-cover"
        src={image ?? undefined}
        alt={name ?? "User avatar"}
      />
      <Avatar.Fallback
        className="leading-1 flex h-10 w-10 items-center justify-center rounded-[inherit] bg-tertiary font-medium"
        delayMs={600}
      >
        {name?.charAt(0)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

interface ProjectProgressProps {
  progress: ProjectLifecycle | undefined | null;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ progress }) => {
  const stateIndex = StateOrder.findIndex((state) => state === progress) ?? -1;

  return (
    <div className="relative flex w-full flex-row justify-between gap-x-4">
      {/* TODO: Fix shadows */}
      <div className="absolute top-1/2 -z-10 h-4 w-full -translate-y-1/2 bg-quaternary" />
      {["bg-disabled", "bg-warning", "bg-error", "bg-success"].map((bg, i) => {
        return (
          <div key={bg} className="h-12 w-12 rounded-full bg-quaternary p-2">
            {i <= stateIndex && (
              <div className={`h-full w-full rounded-full ${bg}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

interface DisplayProjectProps extends FetchedProjectAsProps {
  description: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

const DisplayProject: React.FC<DisplayProjectProps> = ({
  project,
  description,
}) => {
  return (
    <div className="flex-1">
      <div className="relative h-44 w-full shadow">
        <Image
          src={
            project?.bannerImageUrl ??
            `https://picsum.photos/seed/${project?.id ?? "A"}/800/200.webp`
          }
          alt="project banner"
          className="object-cover"
          fill
        />
      </div>
      <article className="mx-5 mt-8">
        <div className="flex flex-row items-start justify-between">
          <h1 className="font-bold text-primary text-r-5xl">
            {project?.title}
          </h1>
          <button className="-mr-3 mt-1 rounded-full p-3 hover:bg-bg-300/30">
            <FiEdit3 className="font-bold text-r-4xl" />
          </button>
        </div>
        <MDX {...description} />
      </article>
    </div>
  );
};
