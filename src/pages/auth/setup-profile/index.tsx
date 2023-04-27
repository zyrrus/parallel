import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { InfoLayout } from "@components/layouts";
import { UserInfoFields } from "@utils/constants/authInputFields";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import { editAccountDetailsSchema } from "@utils/constants/schema/profile";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getServerAuthSession } from "@server/auth";
import { appRouter } from "@server/api/root";
import { prisma } from "@server/db";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { api } from "@utils/api";

export type EditAccountDetailsSchema = z.infer<typeof editAccountDetailsSchema>;
type ValidName = keyof typeof editAccountDetailsSchema.shape;

const SignUp = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { register, formState, handleSubmit, setError } =
    useForm<EditAccountDetailsSchema>({
      resolver: zodResolver(editAccountDetailsSchema),
    });

  const { mutate, isLoading: isUpdatingProfile } =
    api.account.editAccountDetails.useMutation({
      onSuccess({ username }) {
        toast.success(`Welcome, ${username ?? ""}`);
        void router.push("/projects");
      },
      onError(e) {
        if (!e.data) {
          toast.error("Failed to update profile. Please try again later.");
        } else {
          if (e.data.code === "CONFLICT") {
            setError("username", { message: e.message });
          } else {
            toast.error(e.message);
          }
        }
      },
    });

  const disableForm = isUpdatingProfile;

  const onSubmit: SubmitHandler<EditAccountDetailsSchema> = (data) => {
    if (disableForm) return;
    mutate(data);
  };

  return (
    <InfoLayout>
      <h1 className="text-r-3xl my-6 mx-10 text-center font-bold text-primary">
        Tell us about yourself.
      </h1>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col items-center justify-center gap-y-2.5 px-4"
      >
        {UserInfoFields.map(({ name: fieldName, ...fieldProps }) => {
          const isValidName = (
            fieldName: string | undefined
          ): fieldName is ValidName => fieldName !== undefined;

          if (isValidName(fieldName))
            return (
              <TextInput
                key={fieldName}
                error={formState.errors[fieldName]?.message}
                {...fieldProps}
                {...register(fieldName)}
                disabled={disableForm}
              />
            );
        })}
        <Button type="submit" className="mt-12" disabled={disableForm}>
          Update
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

  const isNewUser = await ssg.account.checkIsNewUser.fetch();
  if (isNewUser) {
    return { props: {} };
  }

  return {
    redirect: {
      destination: ctx.query.callbackUrl ?? "/projects",
      permanent: false,
    },
  };
};
