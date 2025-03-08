import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  blocked: {
    type: String,
    enum: ["ban", "unban"],
    default: "unban",
  },
  
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// check password is matched
userSchema.statics.isPasswordMatched = async function (
  password: string,
  hasshedPassword: string
) {
  return await bcrypt.compare(password, hasshedPassword);
};

// instance method checking user is exist or not
userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isUserExistById = async function (id: string) {
  return await User.findOne({ _id: id }).select("+password");
};

export const User = model<TUser, UserModel>("User", userSchema);
