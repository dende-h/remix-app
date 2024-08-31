import { z } from "zod";

// Signupフォームのバリデーションスキーマ
export const signupFieldSchema = z
  .object({
    userName: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(16, {
        message: "Password must be at most 16 characters",
      })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/, {
        message:
          "Password must contain both letters and numbers and be 8-16 characters long",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

//ログインフォームのバリデーションスキーマ
export const loginFieldSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 alphanumeric characters",
    })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Password must contain only alphanumeric characters",
    }),
});
