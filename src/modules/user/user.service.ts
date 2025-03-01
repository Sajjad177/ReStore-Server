import { TUser } from "./user.interface";
import { User } from "./user.schema";

const createUserInDB = async (data: TUser) => {
  const result = await User.create(data);
  return result;
};

export const userService = {
  createUserInDB,
};
