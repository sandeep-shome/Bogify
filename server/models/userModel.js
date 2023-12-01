import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/blogify-66ded.appspot.com/o/users%2Fdefault_user.png?alt=media&token=bedc8151-339d-4c8e-85a6-caf008a904d9",
    },
    verfied: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    coverpicture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/blogify-66ded.appspot.com/o/users%2Fdefault_cover.png?alt=media&token=488e58e2-b0b8-49bb-83b5-bbe679a5002c",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
