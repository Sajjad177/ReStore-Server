import { model, Schema } from "mongoose";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      enum: ["new", "used"],
    },
    condition: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
    category: {
      type: String,
      enum: [
        "clothing",
        "electronics",
        "furniture",
        "books",
        "home appliances",
        "other",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const listing = model("Listing", listingSchema);
