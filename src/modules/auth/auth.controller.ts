import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result = await authService.createUserInDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully",
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      phoneNo: result.phoneNo,
      role: result.role,
      blocked: result.blocked,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.loginInDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

export const authController = {
  createUser,
  login,
};
