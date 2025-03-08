import mongoose, { Schema, model } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;
