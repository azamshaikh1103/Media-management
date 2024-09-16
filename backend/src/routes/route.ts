import { Router } from "express";
import { authController } from "../controllers/authController";
import { appController } from "../controllers/appsController";

const router = Router();

router.post("/auth/login", authController);

router.post("/apps", appController);

export default router;
