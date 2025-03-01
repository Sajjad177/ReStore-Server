import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { listingService } from "./listings.service";

const createNewProduct = catchAsync(async (req, res) => {
  const result = await listingService.createNewProductInDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});











export const listingController = {
  createNewProduct,
};
