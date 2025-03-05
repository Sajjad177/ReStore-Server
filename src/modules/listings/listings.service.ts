import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IListings } from "./listings.interface";
import { listing } from "./listings.schema";
import { User } from "../user/user.schema";

const createNewProductInDB = async (data: IListings, userId: string) => {
  const user = await User.isUserExistById(userId);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  if (user.blocked === "ban") {
    throw new AppError("Your account is blocked", StatusCodes.BAD_REQUEST);
  }

  const result = (await listing.create(data)).populate("userID");
  return result;
};

const getAllProductFromDB = async () => {
  const result = await listing.find({}).populate("userID");
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await listing.findById(id).populate("userID");
  return result;
};

const updateListingProductInDB = async (
  id: string,
  data: Partial<IListings>
) => {
  const result = await listing.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deletedListingProductFromDB = async (id: string) => {
  const result = await listing.findByIdAndDelete(id);
  return result;
};

export const listingService = {
  createNewProductInDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateListingProductInDB,
  deletedListingProductFromDB,
};
