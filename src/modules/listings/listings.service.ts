import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IListings } from "./listings.interface";
import { listing } from "./listings.schema";
import { User } from "../user/user.schema";
import QueryBuilder from "../builder/Querybuilder";

const createNewProductInDB = async (listingData: IListings, userId: string) => {
  const user = await User.isUserExistById(userId);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  if (user.blocked === "ban") {
    throw new AppError("Your account is blocked", StatusCodes.BAD_REQUEST);
  }

  const result = (
    await listing.create({ ...listingData, userID: userId })
  ).populate("userID");
  return result;
};

const getAllProductAvailableFromDB = async () => {
  const result = await listing
    .find({
      status: "available",
    })
    .populate("userID");
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const maxPrice = await listing
    .findOne()
    .sort({ price: -1 })
    .select("price")
    .exec();

  const maxPriceInListing = maxPrice?.price || 0;

  const listingQuery = new QueryBuilder(listing.find(), query)
    .search(["title"])
    .filter()
    .sort()
    .filterByPrice(maxPriceInListing);

  const result = await listingQuery.modelQuery.populate("userID");
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
  getAllProductAvailableFromDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateListingProductInDB,
  deletedListingProductFromDB,
};
