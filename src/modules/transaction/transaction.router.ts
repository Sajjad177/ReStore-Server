import { Router } from "express";
import { transactionController } from "./transaction.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  transactionController.createTransaction
);

router.get(
  "/verify",
  auth(USER_ROLE.admin, USER_ROLE.user),
  transactionController.verifyWithUpdateStatus
);

router.get(
  "/purchases/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  transactionController.getPaurchaseHistory
);

router.get(
  "/sales/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  transactionController.getSalesHistory
);

export const transactionRoutes = router;

// ekon o 2 ta router a kaj baki ache get-> /sales/:userId ar put-> /purchases/:userId
