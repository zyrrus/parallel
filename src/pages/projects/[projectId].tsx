import { MainLayout } from "@components/layouts";
import { ProjectLifecycle } from "@prisma/client";
import { api } from "@utils/api";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { serialize } from "next-mdx-remote/serialize";
import { prisma } from "@server/db";
import superjson from "superjson";
import { appRouter } from "@server/api/root";
import { getServerAuthSession } from "@server/auth";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { MDX } from "@components/MDX";

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
      <article className="mx-11">
        <h1 className="mb-6 mt-8 font-bold text-primary text-r-5xl">
          {data?.title}
        </h1>
        <MDX {...description} />
      </article>
      {/* {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{data.title}</p>
          <p>{formatDate(data.createdAt)}</p>
          <p>{data.description}</p>
          <p>ID: {data.id}</p>
          <p>State: {data.state}</p>
          <div className="flex flex-row gap-x-4">
            <Button
              variant={{ size: "small" }}
              disabled={
                data.state === "PROPOSAL" || isUpdatingState || isRefetching
              }
              onClick={() => changeState(-1)}
            >
              Prev State
            </Button>
            <Button
              variant={{ size: "small" }}
              disabled={
                data.state === "COMPLETE" || isUpdatingState || isRefetching
              }
              onClick={() => changeState(1)}
            >
              Next State
            </Button>
          </div>
        </>
      )} */}
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
  // const project = await ssg.projects.getProjectById.fetch({ projectId });
  // const projectDescription = project?.description ?? "";
  // const mdxSource = await serialize(projectDescription);

  const mdxSource = await serialize(`
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

Paragraph text.

[Link](#)

> Blockquote text

Some \`inline code\` example.

---

![Image](#)

- List item 1
- List item 2
- List item 3

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3

\`\`\`javascript
function greet() {
  console.log("Hello, world!");
}
\`\`\`

*Emphasized* text.

**Strong** text.
      `);

  return { props: { projectId, description: mdxSource } };
};
