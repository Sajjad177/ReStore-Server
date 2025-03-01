export interface TUser {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  role: "admin" | "user";
  blocked: "ban" | "unban";
}
