import { MainLayout } from "@components/layouts";
import { ProjectLifecycle } from "@prisma/client";
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

const StateOrder: ProjectLifecycle[] = Object.values(ProjectLifecycle);

const SpecificProject: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projectId, description }) => {
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
  const { mutate, isLoading: isUpdatingState } =
    api.projects.updateState.useMutation({
      onSuccess: () => {
        void ctx.projects.getProjectById.invalidate();
      },
    });

  const changeState = (diff: -1 | 1) => {
    if (!data) return;

    const newState =
      StateOrder[
        StateOrder.findIndex((state) => state === data.state) + diff
      ] ?? data.state;

    if (newState !== data.state) {
      mutate({
        projectId: data.id,
        state: newState,
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl">
        <BannerImage
          bannerImageUrl={
            data?.bannerImageUrl ??
            `https://picsum.photos/seed/${data?.id ?? "A"}/800/200.webp`
          }
        />
        <article className="mx-11 mt-8 flex-grow">
          <div className="flex flex-row items-start justify-between">
            <h1 className="font-bold text-primary text-r-5xl">{data?.title}</h1>
            <button className="rounded-full p-3 hover:bg-bg-300/30">
              <FiEdit3 size={24} className="font-bold" />
            </button>
          </div>
          <MDX {...description} />
        </article>
      </div>
      {/* Right side panel */}
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

const BannerImage: React.FC<{ bannerImageUrl: string }> = ({
  bannerImageUrl,
}) => {
  // TODO: On hover, show edit button + popup for a new image picker
  return (
    <button className="relative h-44 w-full shadow hover:opacity-80">
      <Image
        src={bannerImageUrl}
        alt="project banner"
        className="object-cover"
        fill
      />
    </button>
  );
};

const ProjectDetails: React.FC<{ title: string }> = ({ title }) => {
  return <></>;
};
