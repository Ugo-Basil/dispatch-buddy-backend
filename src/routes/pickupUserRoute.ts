import { Router } from "express";
import {
  createCustomer,
  loginUser,
  verifyCustomer,
} from "../controllers/pickupUserController";

const router = Router();

router.post("/customer/register", createCustomer);
router.get("/customer/verify/:token", verifyCustomer);
router.post("/login", loginUser);

export default router;
