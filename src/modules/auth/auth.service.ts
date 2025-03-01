import { TUser } from "../user/user.interface";
import { User } from "../user/user.schema";

const createUserInDB = async (data: TUser) => {
  const result = await User.create(data);
  return result;
};

export const authService = {
  createUserInDB,
};
