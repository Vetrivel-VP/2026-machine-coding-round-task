import { z } from "zod";

export const zodSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name is required and should be at least 3 characters"),
  email: z
    .string()
    .email("Invalid Email Address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
  gender: z.string().min(1, "Gender is required"),
});
