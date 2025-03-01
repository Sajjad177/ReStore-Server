import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.schema";
import { IAuth } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const createUserInDB = async (data: TUser) => {
  const result = await User.create(data);
  return result;
};

const loginInDB = async (payload: IAuth) => {
  const user = await User.isUserExist(payload.email);
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError("Password not incorrect", StatusCodes.UNAUTHORIZED);
  }

  const JwtPayload = {
    email: user?.email,
    role: user?.role,
    userId: user?._id?.toString(),
  };

  const token = createToken(
    JwtPayload as { email: string; role: string; userId: string },
    config.jwtAccessTokenExpiresIn as string,
    config.jwtAccessTokenSecret as string
  );

  return token;
};

export const authService = {
  createUserInDB,
  loginInDB,
};
