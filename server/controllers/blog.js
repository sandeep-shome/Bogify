import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

/* ADDING BLOG */

export const addBlog = async (req, res) => {
  try {
    const userDoc = await userModel.findOne({ email: req.email });
    if (!userDoc) {
      return res.status(401).json("something wrong occurred!");
    }

    const newblog = new blogModel({ ...req.body, user_id: userDoc.email });
    const postBlog = await newblog.save();
    if (!postBlog) return res.status(403).json("something wrong occurred!");

    res.status(200).json(postBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* GETTING ALL BLOGS */

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogModel
      .find({ visibility: "public" })
      .sort({ createdAt: -1 });
    res.json(allBlogs);
  } catch (err) {
    res.status(500).json("something wrong occurred!");
  }
};

/* GETTING SINGLE BLOG */

export const blog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    if (!blog) return res.status(404).json("404 Not Found");
    const userInfo = await userModel.findOne({ email: blog.user_id });
    if (!userInfo) return res.status(404).json("404 Not Found");

    res.json({
      ...blog._doc,
      userid: userInfo._id,
      userimage: userInfo.profilepicture,
      username: userInfo.username,
    });
  } catch (err) {
    res.status(500).json("something error occurred!");
  }
};

/* GETTING MORE BLOGS */

export const moreBlogs = async (req, res) => {
  try {
    const cat = req.params.cat;
    const moreBlogs = await blogModel
      .find({ $and: [{ category: cat }, { visibility: "public" }] })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(moreBlogs);
  } catch (err) {
    res.status(500).json("something error occurred!");
  }
};

/* GETTING BLOGS BY EMAIL */

export const getAllBlogsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const blogs = await blogModel
      .find({ $and: [{ user_id: email }, { visibility: "public" }] })
      .sort({ createdAt: -1 });
    if (!blogs) return res.status(404).json("no blog found");
    res.json(blogs);
  } catch (err) {
    res.status(500).json("something error occurred!");
  }
};

/* GETTING USER BLOGS */

export const userBlogs = async (req, res) => {
  try {
    const blog = await blogModel
      .find({ user_id: req.email })
      .sort({ createdAt: -1 });
    res.json(blog);
  } catch (err) {
    res.status(500).json("something error occurred!");
  }
};

/* GETTING USER BLOG INFO */
export const userBlogInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.find({ _id: id });
    if (!blog) return res.status(404).json("blog not found!");
    if (blog[0].user_id === req.email) {
      res.json(blog);
    } else {
      res.status(500).json("something error occurred!");
    }
  } catch (err) {
    res.status(500).json("something error occurred!");
  }
};

/* REMOVE USER BLOG */

export const removeBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.find({ _id: id });
    if (!blog) return res.status(404).json("blog not found!");
    if (blog[0].user_id === req.email) {
      await blogModel.findByIdAndDelete(id);
      res.json("blog successfully deleted!");
    } else {
      res.status(500).json("something error occurred!");
    }
  } catch (err) {
    res.status(500).json("something error occurred!");
  }
};

/* UPDATEING BLOG */

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    if (!blog) return res.status(404).json("blog not found!");

    if (blog.user_id === req.email) {
      const updatedBlog = await blogModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.json(updatedBlog);
    } else {
      return res.status(401).json("something went wrong!");
    }
  } catch (err) {
    res.status(500).json("something error occurred!");
  }
};

export const findPostByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const blogs = await blogModel.find({
      $and: [{ category: category }, { visibility: "public" }],
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json("something went wrong!");
  }
};
