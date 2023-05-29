import type { TextInputProps } from "@utils/types/props";

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
