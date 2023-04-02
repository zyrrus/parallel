import type { NextPage } from "next";
import { MainLayout } from "@components/layouts";
import { requireAuth } from "@components/HOC/requireAuth";

const Projects: NextPage = () => {
  return (
    <MainLayout>
      <h1 className="text-r-5xl font-bold text-primary">Projects</h1>
    </MainLayout>
  );
};

export default Projects;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
