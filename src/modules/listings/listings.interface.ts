import mongoose from "mongoose";

export interface IListings {
  title: string;
  description: string;
  price: number;
  image?: string;
  condition: "new" | "used";
  userID: mongoose.Types.ObjectId;
  status: "available" | "sold";
}
