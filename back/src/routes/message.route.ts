import { Router } from "express";
import {
  getUserMessagesController,
} from "../controllers/message.controller";

const router = Router();

router.get("/", getUserMessagesController);

export default router;
