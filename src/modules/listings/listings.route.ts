import { Router } from "express";
import { listingController } from "./listings.controller";
import validateRequest from "../../middleware/validateRequest";
import { listingValidation } from "./listings.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  // validateRequest(listingValidation.listingValidationSchema),
  listingController.createNewProduct
);

router.get("/", listingController.getAllProduct);
router.get("/:id", listingController.getSingleProduct);

router.put(
  "/:id",
  validateRequest(listingValidation.updateListingValidationSchema),
  listingController.updateListingProduct
);

router.delete("/:id", listingController.deletedListingProduct);

export const listingRoutes = router;
