import { Button } from "@components/Button";
import { MainLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";
import { typo } from "@styles/typography";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import type { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";

interface Props {
  session: Session;
}

const Profile: NextPage<Props> = ({ session }) => {
  const { data, status } = useSession();

  return (
    <MainLayout>
      <h1 className={typo({ tag: "h1" })}>Profile</h1>
      <p className={typo({ tag: "p" })}>{status}</p>
      <p className={typo({ tag: "p" })}>
        (Server side) Signed in as {session?.user.name}
      </p>
      <p className={typo({ tag: "p" })}>
        (Client side) Signed in as {data?.user.name}
      </p>

      <Button
        onClick={() =>
          void signOut({
            callbackUrl: "/",
            redirect: true,
          })
        }
      >
        Sign Out
      </Button>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
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

export default Profile;
