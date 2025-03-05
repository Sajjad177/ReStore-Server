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

export const transactionController = {
  createTransaction,
  verifyPayment,
};
