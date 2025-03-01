import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidation),
  userController.createUser
);


export const userRoutes = router;