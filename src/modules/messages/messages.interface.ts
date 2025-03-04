import mongoose from "mongoose";

export interface IMessage {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  image?: string;
  timestamp: Date;
}
