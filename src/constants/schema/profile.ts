import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(2, { message: "Username must be at least 2 characters long" })
  .max(32, { message: "Username must be 32 characters or less" });

export const nameSchema = z
  .string()
  .max(64, { message: "Name must be 64 characters or less" });

export const bioSchema = z
  .string()
  .max(1024, { message: "Biography must be 1024 characters or less" });

export const editAccountDetailsSchema = z.object({
  username: usernameSchema,
  name: nameSchema,
  bio: bioSchema,
});
