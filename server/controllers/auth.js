import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

/* SIGNUP CONTROLLER */
export const signup = async (req, res) => {
  try {
    const user = new userModel(req.data);
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(405).json(err);
  }
};

/* SIGNIN CONTROLLER */
export const signin = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "Not Found" });
    if (!bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({ error: "Somethhing went wrong!" });
    jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token)
          .json({ status: "token successfully initialized!" });
      }
    );
    //res.json(user);
  } catch (err) {
    res.status(405).json(err);
  }
};

/* SIGNOUT CONTROLLER */
export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signed Out" });
  } catch (err) {
    res.status(405).json(err);
  }
};
