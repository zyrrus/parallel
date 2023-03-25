import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { MainLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";

const Projects: NextPage = () => {
  return (
    <MainLayout>
      <h1 className="text-r-5xl font-bold text-primary">Projects</h1>
    </MainLayout>
  );
};

export default Projects;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (session === null || session.user === null || session.user.id === null) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false },
    };
  }

  return { props: { session } };
};
