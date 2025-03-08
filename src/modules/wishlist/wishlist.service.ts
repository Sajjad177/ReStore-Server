import { IWishlist } from "./wishlist.interface";
import Wishlist from "./wishlist.schema";


const addToWishListInDB = async (payload: IWishlist) => {
    const result = await Wishlist.create(payload);
    return result
}

export const wishlistService = {
    addToWishListInDB
}