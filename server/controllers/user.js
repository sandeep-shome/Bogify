import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

/*GET USER DATA */
export const getUserData = async (req, res) => {
  try {
    const userDoc = await userModel.findOne({ email: req.email });
    const { password, _id, ...userData } = userDoc._doc;
    res.status(200).json({ ...userData });
  } catch (err) {
    res.status(500).json({ error: "user not found" });
  }
};

/*UPDATE USER DATA */
export const updateUserData = async (req, res) => {
  try {
    const userDoc = await userModel.findOneAndUpdate(
      { email: req.email },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(userDoc);
  } catch (err) {
    res.status(401).json({ error: "unauthorized" });
  }
};

/*REMOVE USER DATA */
export const removeUserData = async (req, res) => {
  try {
    const userDoc = await userModel.findOneAndDelete({ email: req.email });
    res.status(200).json(userDoc);
  } catch (err) {
    res.status(401).json({ error: "unauthorized" });
  }
};

/*UPDATE PASSWORD */

export const updatePassword = async (req, res) => {
  try {
    const { previousPassword, newPassword } = req.body;

    const userInfo = await userModel.findOne({ email: req.email });
    if (!userInfo) {
      return res.status(404).json({ error: "user not found!" });
    }

    let isPasswordCorrect = bcrypt.compareSync(
      previousPassword,
      userInfo.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "unauthorized!" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      const updatedUser = await userModel.findOneAndUpdate(
        { email: req.email },
        { password: hashedPassword },
        { new: true }
      );
      res.status(200).json("updation succesful");
    }
  } catch (err) {
    res.status(401).json({ error: "unauthorized" });
  }
};

/* GETTING PROFILE DATA */

export const getProfileData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json("profile not found");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
