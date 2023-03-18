import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Divider from "@components/Divider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { InfoLayout } from "@components/layouts";
import { SignInFields } from "@constants/auth";
import { typo } from "@styles/typography";
import Link from "next/link";

const SignIn = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { data: sessionData } = useSession();
  //   useEffect(() => {
  //     if (sessionData) {
  //       console.log("Has session", sessionData);
  //       if (sessionData.user) {
  //         console.log(`Hello ${sessionData.user.id}`);
  //         void router.push("/projects");
  //       }
  //     }
  //   }, [sessionData]);

  const handleAuth = () => {
    // void signIn("email", { email });
    // router.back();
  };

  return (
    <InfoLayout>
      <h1
        className={typo({
          tag: "h3",
          className: "my-6 mx-10 text-center text-primary",
        })}
      >
        Welcome back. Sign in.
      </h1>
      <form
        onSubmit={handleAuth}
        className="flex w-full max-w-lg flex-col items-center justify-center gap-y-2.5 px-4"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        {SignInFields.map(({ name, ...fieldProps }) => (
          <TextInput key={name} {...fieldProps} />
        ))}
        <Button type="submit" className="mt-12">
          Sign In
        </Button>
      </form>
      <p className={typo({ tag: "p", className: "mt-8 mb-12" })}>
        {"Don't have an account? "}
        <Link
          href="/auth/sign-in"
          className={typo({
            size: "base",
            className: "font-semibold text-tertiary hover:text-tertiary-600",
          })}
        >
          Sign up
        </Link>
      </p>
      <div className="w-full min-w-max max-w-md px-12">
        <Divider>or sign in with</Divider>
      </div>
      <div className="my-8 flex flex-row gap-x-6">
        <AuthWith name="GitHub" />
        <AuthWith name="Google" />
        <AuthWith name="Apple" />
      </div>
    </InfoLayout>
  );
};

const AuthWith: React.FC<{ name: string }> = ({ name }) => {
  const nameLowercase = name.toLowerCase();
  const router = useRouter();

  const handleAuth = async () => {
    await signIn(nameLowercase);
    // await router.push("/projects");
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

export default SignIn;
