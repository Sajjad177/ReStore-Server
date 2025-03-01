import { Router } from "express";

import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getSingleUser);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
