import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    phoneNo: z.string({
      required_error: "Phone number is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.enum(["admin", "user"]).default("user"),
    blocked: z.enum(["ban", "unban"]).default("unban"),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email()
      .optional(),
    phoneNo: z
      .string({
        required_error: "Phone number is required",
      })
      .optional(),
    role: z.enum(["admin", "user"]).default("user").optional(),
    blocked: z.enum(["ban", "unban"]).default("unban").optional(),
  }),
});

export const userValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
