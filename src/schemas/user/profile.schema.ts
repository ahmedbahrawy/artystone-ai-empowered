import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long")
    .trim(),
  email: z.string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  createdAt: z.date()
    .default(() => new Date()),
  updatedAt: z.date()
    .default(() => new Date()),
  isActive: z.boolean()
    .default(true),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

export const userProfileUpdateSchema = userProfileSchema.partial().omit({
  createdAt: true,
}).extend({
  updatedAt: z.date().default(() => new Date()),
});

export type UserProfileUpdate = z.infer<typeof userProfileUpdateSchema>; 