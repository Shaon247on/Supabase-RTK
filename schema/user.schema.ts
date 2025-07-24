import z from "zod";

export const userSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  email: z.email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
