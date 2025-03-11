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

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  transactionController.deleteTransaction
);

router.put(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  transactionController.updateTransactionStatus
);

export const transactionRoutes = router;
