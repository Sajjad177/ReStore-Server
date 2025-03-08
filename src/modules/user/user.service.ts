import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.schema";
import bcrypt from "bcrypt";

const getAllUserFromDB = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUserFromDB = async (id: string, data: Partial<TUser>) => {
  if (data.password) {
    data.password = await bcrypt.hash(
      data.password,
      Number(config.bcryptSaltRounds)
    );
  }

  const result = await User.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
