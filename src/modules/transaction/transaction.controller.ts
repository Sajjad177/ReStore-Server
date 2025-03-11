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

const verifyWithUpdateStatus = catchAsync(async (req, res) => {
  const order = await transactionService.verifyWithUpdateStatusInDB(
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

const updateTransactionStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await transactionService.updateTransactionStatusInDB(
    id,
    status
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Transaction status updated successfully",
    data: result,
  });
});

const deleteTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;
  await transactionService.deleteTransactionFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Transaction deleted successfully",
    data: "",
  });
});

export const transactionController = {
  createTransaction,
  verifyWithUpdateStatus,
  getPaurchaseHistory,
  getSalesHistory,
  updateTransactionStatus,
  deleteTransaction,
};
