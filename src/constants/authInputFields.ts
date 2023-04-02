import type { TextInputProps } from "@utils/types/props";

export const SignInFields: TextInputProps[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
  },
];

export const SignUpFields: TextInputProps[] = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
  },
  ...SignInFields,
];
