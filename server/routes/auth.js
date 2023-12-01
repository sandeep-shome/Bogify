import express from "express";
import { signin, signup, signout } from "../controllers/auth.js";
import passwordEncoder from "../middlewares/passwordEncoding.js";

const router = express.Router();

/* SIGNUP ROUTE */
router.post("/signup", passwordEncoder, signup);

/* SIGNIN ROUTE */
router.post("/signin", signin);

/* SIGNOUT ROUTE */
router.get("/signout", signout);

export default router;
