import { Router } from "express";
import {
  createRider,
  login,
  verifyRider,
} from "../controllers/riderController";


const router = Router();

router.post("/rider/register", createRider);
router.get("/rider/verify/:token", verifyRider);
router.post("/login", login);

export default router;
