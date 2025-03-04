import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { listingRoutes } from "../modules/listings/listings.route";
import { messageRoutes } from "../modules/messages/messages.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/listings",
    route: listingRoutes,
  },
  {
    path: "/messages",
    route: messageRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
