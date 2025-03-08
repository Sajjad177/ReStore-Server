import { Types } from "mongoose";

export interface IWishlist {
  _id: string;
  userID: Types.ObjectId;
  listings: Types.ObjectId[];
}
