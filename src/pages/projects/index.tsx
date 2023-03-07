/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getServerAuthSession } from "@server/auth";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Text from "@components/Text";
import { Button } from "@components/Button";
import { signOut } from "next-auth/react";

const Projects: NextPage = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Text tag="h1">Projects</Text>
      <Text>Signed in as {session}</Text>

      <Button onClick={() => void signOut()}>Sign Out</Button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: { destination: "/auth/sign-in", permanent: false },
    };
  }

  return { props: { session } };
};

export default Projects;
