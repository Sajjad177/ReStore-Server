import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { messageService } from "./messages.service";
import { IMessage } from "./messages.interface";
import AppError from "../../error/AppError";

const sendMessage = catchAsync(async (req, res) => {
  const { userId } = req.user;
  let messageData: any = {};

  if (req.body.data) {
    try {
      messageData = JSON.parse(req.body.data);
    } catch (error) {
      console.error("Error parsing message data:", error);
      throw new AppError("Invalid message data", StatusCodes.BAD_REQUEST);
    }
  } else {
    messageData = req.body;
  }

  if (!messageData?.receiverId) {
    throw new AppError("Missing message data", StatusCodes.BAD_REQUEST);
  }

  const messagePayload = {
    ...messageData,
    image: req.file?.path || null,
  };

  const result = await messageService.sendMessageInDB(
    messagePayload as IMessage,
    userId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getMessages = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const result = await messageService.getMessagesFromDB(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Message retrieved successfully",
    data: result,
  });
});

export const messageController = {
  sendMessage,
  getMessages,
};
