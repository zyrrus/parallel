import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { InfoLayout } from "@components/layouts";
import { SignUpFields } from "@constants/authInputFields";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import { signupSchema } from "@constants/schema/profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getServerAuthSession } from "@server/auth";
import { appRouter } from "@server/api/root";
import { prisma } from "@server/db";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { api } from "@utils/api";

export type SignUpSchema = z.infer<typeof signupSchema>;
type ValidName = keyof typeof signupSchema.shape;

const SignUp = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { mutateAsync } = api.account.disableNewUserStatus.useMutation({
    onSuccess() {
      toast("Success");
    },
    onError() {
      toast("Fail");
    },
  });

  const router = useRouter();
  const { asPath, query } = router;

  const { register, formState, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
  });

  //   const onSubmit = useCallback((data) => {}, []);

  return (
    <InfoLayout>
      <h1 className="text-r-3xl my-6 mx-10 text-center font-bold text-primary">
        Sign up. Get Connected.
      </h1>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        // onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col items-center justify-center gap-y-2.5 px-4"
      >
        <input name="csrfToken" type="hidden" />
        {SignUpFields.map(({ name, ...fieldProps }) => {
          const isValidName = (name: string | undefined): name is ValidName =>
            name !== undefined;

          if (isValidName(name))
            return (
              <TextInput
                key={name}
                error={formState.errors[name]?.message}
                {...fieldProps}
                {...register(name)}
              />
            );
        })}
        <Button type="submit" className="mt-12">
          Sign Up
        </Button>
      </form>
    </InfoLayout>
  );
};

export default SignUp;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  // Sign in if not authed
  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }

  // If authed but not a new user,
  // go to projects or to callback url if one was specified
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: superjson,
  });

  const data = await ssg.account.getNewUserStatus.fetch();

  if (!data?.isNewUser) {
    return {
      redirect: {
        destination: ctx.query.callbackUrl ?? "/projects",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
