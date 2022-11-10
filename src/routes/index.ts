import { Router, Request, Response } from "express";

const router = Router();

/* GET home page. */

router.get("/", function (req: Request, res: Response, next) {
  res.send("Hello from Dispatch Buddy!");
});

export default router;
