import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: " Title should be of type string"
  }).min(2, "Title must be at least 2 Character").max(200),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: " Title should be of type string"
  }).min(2, "Body must be at least 2 Character").max(200),
});

export const createUserRegisterSchema = z.object({
  username: z.string({}).min(2).max(100), // .optional()
  email: z.string({}).min(2).max(100).email(),
  password: z.string({}).min(2).max(100),
})

export const UserLoginSchema = z.object({
  email: z.string({}).min(2).max(100).email(),
  password: z.string({}).min(2).max(100),
})