import { z } from "zod";

const listingValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    image: z
      .string({
        required_error: "Image is required",
      })
      .optional(),
    condition: z.string({
      required_error: "Condition is required",
    }),
    userID: z.string({
      required_error: "User ID is required",
    }),
    status: z.enum(["available", "sold"]).default("available"),
  }),
});

const updateListingValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .optional(),
    description: z
      .string({
        required_error: "Description is required",
      })
      .optional(),
    price: z
      .number({
        required_error: "Price is required",
      })
      .optional(),
    image: z
      .string({
        required_error: "Image is required",
      })
      .optional(),
    condition: z
      .string({
        required_error: "Condition is required",
      })
      .optional(),
    userID: z
      .string({
        required_error: "User ID is required",
      })
      .optional(),
    status: z.enum(["available", "sold"]).default("available").optional(),
  }),
});

export const listingValidation = {
  listingValidationSchema,
  updateListingValidationSchema,
};
