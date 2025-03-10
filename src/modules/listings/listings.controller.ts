import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { listingService } from "./listings.service";
import AppError from "../../error/AppError";

const createNewProduct = catchAsync(async (req, res) => {
  const { userId } = req.user;

  let listingData;

  try {
    if (!req.body.data) {
      throw new AppError("Missing listing data", StatusCodes.BAD_REQUEST);
    }
    listingData = JSON.parse(req.body.data);
  } catch (error) {
    throw new AppError("Invalid listing data", StatusCodes.BAD_REQUEST);
  }

  const result = await listingService.createNewProductInDB(
    {
      ...listingData,
      image: req.file?.path,
    },
    userId
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProductAvailable = catchAsync(async (req, res) => {
  const result = await listingService.getAllProductAvailableFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Available Product successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await listingService.getAllProductFromDB(req.query);

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
  const { id } = req.params;

  let listingData;

  try {
    if (!req.body.data) {
      throw new AppError("Missing listing data", StatusCodes.BAD_REQUEST);
    }
    listingData = JSON.parse(req.body.data);
  } catch (error) {
    console.log(error);
    throw new AppError("Invalid listing data", StatusCodes.BAD_REQUEST);
  }

  // get image path
  const imagePath = req.file ? req.file.path : listingData.image;
  const result = await listingService.updateListingProductInDB(id, {
    ...listingData,
    image: imagePath,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deletedListingProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await listingService.deletedListingProductFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product deleted successfully",
    data: "",
  });
});

export const listingController = {
  createNewProduct,
  getAllProductAvailable,
  getAllProduct,
  getSingleProduct,
  updateListingProduct,
  deletedListingProduct,
};
