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
  transactionController.verifyPayment
);

export const transactionRoutes = router;
