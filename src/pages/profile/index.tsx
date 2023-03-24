import { Button } from "@components/Button";
import { MainLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";
import { typo } from "@styles/typography";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, status } = useSession();

  return (
    <MainLayout>
      <h1 className={typo({ tag: "h1", className: "text-primary" })}>
        Profile
      </h1>
      <p className={typo({ tag: "p" })}>{status}</p>
      <p className={typo({ tag: "p" })}>Signed in as {data?.user.name}</p>

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

export default Profile;
