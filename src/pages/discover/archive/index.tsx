import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { DiscoverLayout } from "@components/layouts";
import { typo } from "@styles/typography";
import { getServerAuthSession } from "@server/auth";

const Archive: NextPage = () => {
  return (
    <DiscoverLayout>
      <h2 className={typo({ tag: "h2" })}>Archive</h2>
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
