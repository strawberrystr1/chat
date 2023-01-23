import { Router } from "express";
import {
  handleGetAllUsers,
  loginUserController
} from "../controllers/user.controller";

const router = Router();

router.get("/", handleGetAllUsers);
router.post("/login", loginUserController);

export default router;
