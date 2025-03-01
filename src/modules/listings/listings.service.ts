import { IListings } from "./listings.interface";
import { listing } from "./listings.schema";

const createNewProductInDB = async (data: IListings) => {
  const result = (await listing.create(data)).populate("userID");
  return result;
};

export const listingService = {
  createNewProductInDB,
};
