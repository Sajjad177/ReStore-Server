import { model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    buyerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sellerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemID: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: ["pending", "completed"],
    //   default: "pending",
    // },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model("Transaction", transactionSchema);
