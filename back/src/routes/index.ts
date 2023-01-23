import { Router } from "express";

import userRouter from "./user.routes";
import messageRouter from "./message.route";

const router = Router();

router.use("/user", userRouter);
router.use('/message', messageRouter)

export default router;
