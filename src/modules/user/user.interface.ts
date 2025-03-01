import { Model } from "mongoose";

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
}
