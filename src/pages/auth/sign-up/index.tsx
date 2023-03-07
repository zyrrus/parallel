import { Button } from "@components/Button";
import TextInput from "@components/TextInput";
import Text from "@components/Text";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Image from "next/image";
import Divider from "@components/Divider";
import type { ZodString } from "zod";
import { z } from "zod";
import { useRouter } from "next/router";
import Link from "next/link";

interface FormInputField {
  name: string;
  label: string;
  validator: ZodString;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const SignIn = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const fields: FormInputField[] = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "Enter your full name",
      validator: z
        .string({
          required_error: "Full name is required",
        })
        .min(1, { message: "Name must not be empty" }),
    },
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
      validator: z
        .string({
          required_error: "Username is required",
        })
        .min(3, { message: "Username must be at least 3 characters long" }),
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      autoComplete: "email",
      validator: z
        .string({
          required_error: "Email is required",
        })
        .email({ message: "Invalid email address" }),
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      validator: z.string({
        required_error: "Password is required",
      }),
      //   .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { message: "Password must contain ..." }),
    },
  ];

  const router = useRouter();

  const handleAuth = () => {
    // void signIn("email", { email });
    // router.back();
  };

  return (
    <>
      <Text styleLike="h3" className="my-6 mx-10 text-center text-primary">
        Sign up. Get Connected.
      </Text>
      <form
        onSubmit={handleAuth}
        className="flex w-full max-w-lg flex-col items-center justify-center gap-y-2.5 px-4"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        {fields.map(({ name, ...fieldProps }) => (
          <TextInput key={name} {...fieldProps} />
        ))}
        <Button type="submit" className="mt-12">
          Sign Up
        </Button>
      </form>
      <Text className="mt-8 mb-12">
        Already have an account?{" "}
        <Link href="/auth/sign-in">
          <Text
            tag="span"
            weight="semibold"
            className="text-tertiary hover:text-tertiary-600"
          >
            Sign in
          </Text>
        </Link>
      </Text>
      <div className="w-full min-w-max max-w-md px-12">
        <Divider>or sign up with</Divider>
      </div>
      <div className="my-8 flex flex-row gap-x-6">
        <AuthWith name="GitHub" />
        <AuthWith name="Google" />
        <AuthWith name="Apple" />
      </div>
    </>
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
