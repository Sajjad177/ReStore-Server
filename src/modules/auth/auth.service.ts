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

  const isBlocked = user.blocked as string;
  if (isBlocked === "ban") {
    throw new AppError("Your account is blocked", StatusCodes.BAD_REQUEST);
  }

  const userPassword = user.password as string;
  if (!(await User.isPasswordMatched(payload?.password, userPassword))) {
    throw new AppError("Password is incorrect", StatusCodes.UNAUTHORIZED);
  }

  const JwtPayload = {
    email: user.email as string,
    role: user.role as string,
    userId: user._id?.toString() as string,
  };

  console.log("this is jwt payload", JwtPayload);

  // create access token
  const token = createToken(
    JwtPayload,
    config.jwtAccessTokenExpiresIn as string,
    config.jwtAccessTokenSecret as string
  );

  return {
    token,
  };
};

export const authService = {
  createUserInDB,
  loginInDB,
};
