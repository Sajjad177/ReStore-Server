import { Router } from "express";

import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getSingleUser);

router.put(
  "/:id",
  // validateRequest(userValidation.updateUserValidationSchema),
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
