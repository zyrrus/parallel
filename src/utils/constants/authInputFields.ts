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

export const UserInfoFields: TextInputProps[] = [
  {
    name: "username",
    required: true,
    label: "Username",
    placeholder: "Enter your username",
  },
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "Enter your bio",
  },
];
