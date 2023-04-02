import { z } from "zod";

export const proposalSchema = z.object({
  title: z
    .string({
      description: "Give your project a title",
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .trim()
    .min(5, "Titles must be at least 5 characters long")
    .max(64, "Titles must be 64 characters or less"),
  description: z
    .string({
      description: "Describe your project",
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(5, "Descriptions must be at least 5 characters long")
    .max(1028, "Descriptions must be 1028 characters or less"),
});
