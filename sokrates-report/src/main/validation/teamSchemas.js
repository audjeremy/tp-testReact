import { z } from "zod";

export const TeamMemberSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    age: z.number().int().min(0).max(120),
    phone: z.string().min(1, "Phone is required"),
    access: z.enum(["admin", "manager", "user"]),
  })
  .strict();
export const TeamListSchema = z.array(TeamMemberSchema);

export const TeamFilterSchema = z
  .string()
  .min(2, "Please enter at least 2 characters");