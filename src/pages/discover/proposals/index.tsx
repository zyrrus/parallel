import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { DiscoverLayout } from "@components/layouts";
import { typo } from "@styles/typography";
import { getServerAuthSession } from "@server/auth";

const Proposals: NextPage = () => {
  return (
    <DiscoverLayout>
      <h2 className={typo({ tag: "h2" })}>Proposals</h2>
    </DiscoverLayout>
  );
};

export default Proposals;

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
