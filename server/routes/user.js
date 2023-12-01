import express from "express";
import { jwtVerifier } from "../middlewares/jwtVerifier.js";
import {
  getUserData,
  updateUserData,
  removeUserData,
  updatePassword,
  getProfileData,
} from "../controllers/user.js";

const router = express.Router();

/* USER INFORMATION ROUTE */
router.get("/data", jwtVerifier, getUserData);

/* USER INFORMATION UPDATE ROUTE */
router.put("/edit", jwtVerifier, updateUserData);

/* USER DELETE ROUTE */
router.put("/remove", jwtVerifier, removeUserData);

/* UPDATE PASSWORD */
router.put("/update-password", jwtVerifier, updatePassword);

/* GETTING OTHER'S INFORMATION */
router.get("/profile/:id", getProfileData);

export default router;
