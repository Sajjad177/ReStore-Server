import { z } from "zod";

const messageValidation = z.object({
  body: z.object({
    message: z.string({
      required_error: "Message is required",
    }),
    senderId: z.string({
      required_error: "Sender ID is required",
    }),
    receiverId: z.string({
      required_error: "Receiver ID is required",
    }),
    timestamp: z.date().optional(),
  }),
});

export const messageValidationSchema = {
  messageValidation,
};
