import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { listingService } from "../listings/listings.service";
import { wishlistService } from "./wishlist.service";

const addToWishList = catchAsync(async (req, res) => {
  const result = await wishlistService.addToWishListInDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product added to wishlist successfully",
    data: result,
  });
});

export const wishListController = {
  addToWishList,
};
