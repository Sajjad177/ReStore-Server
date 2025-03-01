import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserInDB(req.body);

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

export const userController = {
  createUser,
};
