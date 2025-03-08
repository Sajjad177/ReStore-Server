import { Router } from "express";
import { wishListController } from "./wishlist.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/add",
  auth(USER_ROLE.user, USER_ROLE.admin),
  wishListController.addToWishList
);


export const wishListRoutes = router;