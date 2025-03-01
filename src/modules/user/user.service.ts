import { User } from "./user.schema";

const getAllUserFromDB = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
