import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  role: "admin" | "user";
  blocked: "ban" | "unban";
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    password: string,
    hasshedPassword: string
  ): Promise<boolean>;
  isUserExist(email: string): Promise<Partial<TUser>>;
  isUserExistById(id: string): Promise<Partial<TUser>>;
}

export type TUserRole = keyof typeof USER_ROLE;
