import { Router } from "express";
import { listingController } from "./listings.controller";
import validateRequest from "../../middleware/validateRequest";
import { listingValidation } from "./listings.validation";

const router = Router();

router.post(
  "/",
  validateRequest(listingValidation),
  listingController.createNewProduct
);

export const listingRoutes = router;