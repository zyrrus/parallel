import { Button } from "@components/Button";
import { MainLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";
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
      <h1 className="text-r-5xl font-bold text-primary">Profile</h1>
      <p className="text-r-lg">{status}</p>
      <p className="text-r-lg">Signed in as {data?.user.name}</p>

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
