import mongoose from "mongoose";

export interface IListings {
  title: string;
  description: string;
  price: number;
  image?: string;
  condition: "new" | "used";
  city: string;
  userID: mongoose.Types.ObjectId;
  status: "available" | "sold";
  category:
    | "clothing"
    | "electronics"
    | "furniture"
    | "books"
    | "home appliances"
    | "other";
}
