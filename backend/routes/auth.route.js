import express from "express";
import { userSignup, userLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", userSignup);
router.post("/login", userLogin);

export default router;
