import { Button } from "@components/Button";
import TextInput from "@components/TextInput";
import Text from "@components/Text";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Divider from "@components/Divider";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import Layout from "@components/layouts/Layout";
import { SignUpFields } from "@constants/auth";

const SignUp = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { data: sessionData } = useSession();
  //   useEffect(() => {
  //     if (sessionData !== null) {
  //       console.log("Has session", sessionData);
  //       console.log(`Hello ${sessionData.user.id}`);
  //       void router.push("/projects");
  //     }
  //   }, [sessionData]);

  const handleEmailAuth = () => {
    // void signIn("email", { email });
  };

  return (
    <Layout layout="auth">
      <Text styleLike="h3" className="my-6 mx-10 text-center text-primary">
        Sign up. Get Connected.
      </Text>
      <form
        onSubmit={handleEmailAuth}
        className="flex w-full max-w-lg flex-col items-center justify-center gap-y-2.5 px-4"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        {SignUpFields.map(({ name, ...fieldProps }) => (
          <TextInput key={name} {...fieldProps} />
        ))}
        <Button type="submit" className="mt-12">
          Sign Up
        </Button>
      </form>
      <Text className="mt-8 mb-12">
        Already have an account?{" "}
        <Text
          tag="a"
          href="/auth/sign-in"
          weight="semibold"
          className="text-tertiary hover:text-tertiary-600"
        >
          Sign in
        </Text>
      </Text>
      <div className="w-full min-w-max max-w-md px-12">
        <Divider>or sign up with</Divider>
      </div>
      <div className="my-8 flex flex-row gap-x-6">
        <AuthWith name="GitHub" />
        <AuthWith name="Google" />
        <AuthWith name="Apple" />
      </div>
    </Layout>
  );
};

const AuthWith: React.FC<{ name: string }> = ({ name }) => {
  const nameLowercase = name.toLowerCase();

  const handleAuth = async () => {
    await signIn(nameLowercase);
  };

  return (
    <button
      onClick={() => void handleAuth()}
      className="rounded-full shadow-solid-medium transition-all hover:shadow-solid-medium-lowered active:shadow-solid-lowest"
    >
      <Image
        src={`/${nameLowercase}.svg`}
        alt={`sign up with ${name}`}
        width={40}
        height={40}
        className="rounded-full bg-black hover:opacity-75 active:opacity-50"
      />
    </button>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default SignUp;
