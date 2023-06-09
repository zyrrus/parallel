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
import React, { useEffect, useMemo, useState } from "react";
import { ProfilePicture } from "@components/ProfilePicture";
import {
  EditorDisplay,
  MemberDisplay,
  PreviewDisplay,
  VisitorDisplay,
} from "@components/projects/Displays";
import { useSession } from "next-auth/react";
import { ProjectPageMode } from "@utils/types/projects";

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

const componentsByMode = {
  // dont show edit button
  [ProjectPageMode.visitor]: VisitorDisplay,
  // show edit button
  [ProjectPageMode.member]: MemberDisplay,
  // show cancel + save buttons + editable fields
  [ProjectPageMode.editor]: EditorDisplay,
  // show visitor and replace edit button with back/end preview button
  [ProjectPageMode.preview]: PreviewDisplay,
};

const StateOrder: ProjectLifecycle[] = Object.values(ProjectLifecycle);

const SpecificProject: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projectId, description }) => {
  const [mode, setMode] = useState(ProjectPageMode.visitor);

  const session = useSession();

  const { data, isRefetching } = api.projects.getProjectById.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      projectId,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setMode(
      session.status === "authenticated"
        ? ProjectPageMode.member
        : ProjectPageMode.visitor
    );
  }, [session.status]);

  //   const ctx = api.useContext();
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

  const Display = useMemo(() => componentsByMode[mode], [mode]);

  return (
    <MainLayout>
      <div className="flex flex-row justify-between">
        <Display project={data} description={description} setMode={setMode} />
        {/* Right side panel */}
        <div className="sticky top-0 flex h-screen w-96 flex-row">
          <div className="w-1.5 border-x-2 border-x-fg/10" />
          <aside className="flex w-full flex-col gap-y-4 overflow-x-hidden px-5 py-8">
            <div>
              <h2 className="mb-2 font-bold text-primary text-r-4xl">
                Contributors
              </h2>
              <div className="flex flex-row gap-x-4">
                {/* TODO: Handle overflow */}
                <ProfilePicture
                  name={data?.author.name}
                  username={data?.author.username}
                  image={data?.author.image}
                />
                {data?.members.map((member) => (
                  <ProfilePicture
                    name={member.name}
                    username={member.username}
                    image={member.image}
                  />
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
