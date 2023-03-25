import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { DiscoverLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";

const Archive: NextPage = () => {
  return (
    <DiscoverLayout>
      <h2 className="text-r-4xl font-bold">Archive</h2>
    </DiscoverLayout>
  );
};

export default Archive;

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
