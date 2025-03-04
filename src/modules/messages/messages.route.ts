import { Router } from "express";
import { messageController } from "./messages.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  multerUpload.single("image"),
  messageController.sendMessage
);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  messageController.getMessages
);

export const messageRoutes = router;
