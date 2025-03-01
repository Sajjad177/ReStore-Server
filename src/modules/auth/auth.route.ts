import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "../user/user.validation";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidation.userValidationSchema),
  authController.createUser
);

router.post("/login", validateRequest(authValidation), authController.login);

export const authRoutes = router;
