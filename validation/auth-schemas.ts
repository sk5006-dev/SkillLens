import { z } from "zod";

// Password constraints: min 6 chars, at least one uppercase letter, one number, and one special character
export const passwordSchema = z.string()
  .min(6, "Password must be at least 6 characters")
  .refine(
    (val) => /[A-Z]/.test(val),
    { message: "Must include at least one uppercase letter" }
  )
  .refine(
    (val) => /[0-9]/.test(val),
    { message: "Must include at least one number" }
  )
  .refine(
    (val) => /[^A-Za-z0-9]/.test(val),
    { message: "Must include at least one special character" }
  );

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
