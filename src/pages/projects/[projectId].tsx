import { requireAuth } from "@components/HOC/requireAuth";
import { MainLayout } from "@components/layouts";
import { api } from "@utils/api";
import type { InferGetServerSidePropsType, NextPage } from "next";

const SpecificProject: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projectId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = api.projects.getProjectById.useQuery({ projectId });

  return (
    <MainLayout>
      <p>{data?.id}</p>
    </MainLayout>
  );
};

export default SpecificProject;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: { projectId: ctx.params?.projectId } };
});
