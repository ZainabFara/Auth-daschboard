//Den här filen fungerar som en router för dina autentiseringsrutter
import express from "express";
import { login, signup , logout , verifyEmail } from "../controllers/auth.controllers.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.post("/logout",logout);

router.post("/verify-email", verifyEmail);

export default router;