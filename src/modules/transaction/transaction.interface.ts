import mongoose from "mongoose";

export interface ITransaction {
  buyerID: mongoose.Types.ObjectId;
  sellerID: mongoose.Types.ObjectId;
  itemID: mongoose.Types.ObjectId;
  status: "pending" | "completed";
  paymentStatus: "pending" | "completed";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}
