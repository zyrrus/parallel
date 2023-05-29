import Button from "@components/Button";
import { requireAuth } from "@components/HOC/requireAuth";
import { MainLayout } from "@components/layouts";
import { ProjectLifecycle } from "@prisma/client";
import { api } from "@utils/api";
import { formatDate } from "@utils/filters";
import type { InferGetServerSidePropsType, NextPage } from "next";

const StateOrder: ProjectLifecycle[] = Object.values(ProjectLifecycle);

const SpecificProject: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projectId }) => {
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
      <h1 className="mx-11 mb-6 mt-8 font-bold text-primary text-r-5xl">
        {data?.title}
      </h1>
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: { projectId: ctx.params?.projectId } };
});
