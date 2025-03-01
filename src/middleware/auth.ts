import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import { User } from "../modules/user/user.schema";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError("You are not authorized", StatusCodes.UNAUTHORIZED);
      }

      const decoded = jwt.verify(token, config.jwtAccessTokenSecret as string);

      const { role, userId } = decoded as JwtPayload;

      const user = await User.isUserExistById(userId);
      if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }

      const isBlocked = user.blocked as string;
      if (isBlocked === "ban") {
        throw new AppError("Your account is blocked", StatusCodes.BAD_REQUEST);
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError("You are not Admin", StatusCodes.UNAUTHORIZED);
      }

      req.user = decoded as JwtPayload;
      next();
    }
  );
};

export default auth;
