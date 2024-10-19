//Den här filen fungerar som en router för dina autentiseringsrutter
import express from "express";
import { login, signup , logout } from "../controllers/auth.controllers.js";


const router = express.Router();

router.get("/signup", signup);
router.get("/login",login);
router.get("/logout",logout);

export default router;