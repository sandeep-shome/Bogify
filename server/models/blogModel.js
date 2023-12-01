import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true, default: "image.jpg" },
    category: { type: String, required: true },
    visibility: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
