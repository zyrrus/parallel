import { Button } from "@components/Button";
import { requireAuth } from "@components/HOC/requireAuth";
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

export default Profile;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
