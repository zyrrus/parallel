import type { ZodString } from "zod";
import { z } from "zod";

interface FormInputField {
  name: string;
  label: string;
  validator: ZodString;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

export const SignInFields: FormInputField[] = [
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
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    validator: z.string({
      required_error: "Password is required",
    }),
    //   .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { message: "Password must contain ..." }),
  },
];

export const SignUpFields: FormInputField[] = [
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
    autoComplete: "current-password",
    placeholder: "Enter your password",
    validator: z.string({
      required_error: "Password is required",
    }),
    //   .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { message: "Password must contain ..." }),
  },
];
