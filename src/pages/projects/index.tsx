import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { MainLayout } from "@components/layouts";
import { typo } from "@styles/typography";
import { getServerAuthSession } from "@server/auth";

const Projects: NextPage = () => {
  return (
    <MainLayout>
      <h1 className={typo({ tag: "h1" })}>Projects</h1>
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
