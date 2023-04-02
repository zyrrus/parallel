import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { Divider } from "@components/Divider";
import { useRouter } from "next/router";
import { InfoLayout } from "@components/layouts";
import toast from "react-hot-toast";
import { SignInWith } from "@components/SignInWith";
import { api } from "@utils/api";
import { getQueryOrDefault } from "@utils/filters";
import { getServerAuthSession } from "@server/auth";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@server/api/root";
import { prisma } from "@server/db";
import superjson from "superjson";

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const signInWith = (providerId: string) => {
    void signIn(providerId);
  };

  const signInWithPlaceholder = (providerName: string) => {
    toast.error(`${providerName} provider isn't available yet.`);
  };

  return (
    <InfoLayout>
      <h1 className="text-r-3xl my-3 mx-4 text-center font-bold text-primary">
        Welcome!
      </h1>
      <p className="text-r-lg text-center">
        Please sign in with one of the providers below.
      </p>
      <Divider barsClassName="container my-6" />
      <div className="mt-1.5 flex flex-col gap-y-8">
        {providers &&
          Object.values(providers).map(({ id, name }) => (
            <SignInWith
              key={id}
              id={id}
              label={name}
              onClick={() => void signInWith(id)}
            />
          ))}
        <SignInWith
          id={"github"}
          label={"Github"}
          onClick={() => {
            signInWithPlaceholder("Github");
          }}
        />
        <SignInWith
          id={"twitter"}
          label={"Twitter"}
          onClick={() => {
            signInWithPlaceholder("Twitter");
          }}
        />
        <SignInWith
          id={"facebook"}
          label={"Facebook"}
          onClick={() => {
            signInWithPlaceholder("Facebook");
          }}
        />
        <SignInWith
          id={"apple"}
          label={"Apple"}
          onClick={() => {
            signInWithPlaceholder("Apple");
          }}
        />
      </div>
    </InfoLayout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    const providers = await getProviders();
    return {
      props: {
        providers,
      },
    };
  }

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: superjson,
  });

  const isNewUser = await ssg.account.getNewUserStatus.fetch();
  if (isNewUser) {
    return {
      redirect: {
        destination: "/auth/sign-up",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: ctx.query.callbackUrl ?? "/projects",
      permanent: false,
    },
  };
}

export default SignIn;
