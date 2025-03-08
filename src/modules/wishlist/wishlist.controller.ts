import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { listingService } from "../listings/listings.service";
import { wishlistService } from "./wishlist.service";

const addToWishList = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await wishlistService.addToWishListInDB(req.body, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product added to wishlist successfully",
    data: result,
  });
});

const getWishList = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await wishlistService.getWishListFromDB(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Wishlist fetched successfully",
    data: result,
  });
});

const removeFromWishList = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const listingId = req.params.id;
  const result = await wishlistService.removeFromWishListInDB(
    listingId,
    userId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product removed from wishlist successfully",
    data: result,
  });
});

export const wishListController = {
  addToWishList,
  getWishList,
  removeFromWishList,
};
