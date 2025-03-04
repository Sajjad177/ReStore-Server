import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IMessage } from "./messages.interface";
import { Message } from "./messages.schema";

const sendMessageInDB = async (payload: IMessage, userId: string) => {
  if (!userId) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }
  const result = await Message.create({
    ...payload,
    senderId: userId,
  });

  return result;
};

const getMessagesFromDB = async (id: string, myId: string) => {
  const result = await Message.find({
    $or: [
      { senderId: myId, receiverId: id },
      { senderId: id, receiverId: myId },
    ],
  });

  return result;
};

export const messageService = {
  sendMessageInDB,
  getMessagesFromDB,
};
