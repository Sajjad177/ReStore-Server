import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { transactionService } from "./transaction.service";

const createTransaction = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const data = req.body;

  const result = await transactionService.createTransactionInDB(
    data,
    userId,
    req.ip!
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Transaction created successfully",
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await transactionService.verifyPayment(
    req.query.order_id as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment verified successfully",
    data: order,
  });
});

const getPaurchaseHistory = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { userId: myUserId } = req.user;

  const result = await transactionService.getPaurchaseHistoryFromDB(
    userId,
    myUserId,
    req.query
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Transaction fetched successfully",
    data: result,
  });
});

const getSalesHistory = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { userId: myUserId } = req.user;

  const result = await transactionService.getSalersHistoryFromDB(
    userId,
    myUserId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Sales fetched successfully",
    data: result,
  });
});

export const transactionController = {
  createTransaction,
  verifyPayment,
  getPaurchaseHistory,
  getSalesHistory,
};
