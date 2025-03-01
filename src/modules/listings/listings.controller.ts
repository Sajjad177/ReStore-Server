import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { listingService } from "./listings.service";

const createNewProduct = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await listingService.createNewProductInDB(req.body, userId);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await listingService.getAllProductFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await listingService.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product get successfully",
    data: result,
  });
});

const updateListingProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await listingService.updateListingProductInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

export const listingController = {
  createNewProduct,
  getAllProduct,
  getSingleProduct,
  updateListingProduct,
};
