import express from "express";
import { signup, login, activate } from "../controllers/users";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/activate", activate);

export default router;
