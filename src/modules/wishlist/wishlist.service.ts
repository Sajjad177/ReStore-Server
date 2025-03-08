import { IWishlist } from "./wishlist.interface";
import Wishlist from "./wishlist.schema";

const addToWishListInDB = async (payload: IWishlist, userId: string) => {
  const result = await Wishlist.create({ ...payload, userID: userId });
  return result;
};

const getWishListFromDB = async (userId: string) => {
  const result = await Wishlist.findOne({ userID: userId });
  return result;
};

const removeFromWishListInDB = async (listingId: string, userId: string) => {
  const result = await Wishlist.findOneAndUpdate(
    { userID: userId },
    { $pull: { listings: listingId } },
    { new: true }
  );
  return result;
};

export const wishlistService = {
  addToWishListInDB,
  getWishListFromDB,
  removeFromWishListInDB,
};
