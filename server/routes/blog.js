import express from "express";
import {
  addBlog,
  blog,
  getAllBlogs,
  moreBlogs,
  getAllBlogsByEmail,
  userBlogs,
  userBlogInfo,
  removeBlog,
  updatePost,
  findPostByCategory,
} from "../controllers/blog.js";
import { jwtVerifier } from "../middlewares/jwtVerifier.js";
const router = express.Router();

/* ADDING BLOG */
router.post("/addblog", jwtVerifier, addBlog);

/* GETTING ALL BLOGS */
router.get("/allblogs", getAllBlogs);

/* GETTING ALL BLOGS BY EMAIL ID*/
router.get("/getblogs/:email", getAllBlogsByEmail);

/* GETTIING SINGLE BLOG INFO */
router.get("/bloginfo/:id", blog);

/* GETTING MORE BLOGS */
router.get("/moreblogs/:cat", moreBlogs);

/* GETTING USER BLOGS */
router.get("/userblogs", jwtVerifier, userBlogs);

/* GETTING USER BLOG INFO */
router.get("/userblogsinfo/:id", jwtVerifier, userBlogInfo);

/* REMOVE USER BLOG */
router.delete("/removeblog/:id", jwtVerifier, removeBlog);

/* UPDATE BLOG */
router.put("/updateblog/:id", jwtVerifier, updatePost);

/* GETTING BLOG BY CATEGOIRY */
router.get("/blogbycategory/:category", findPostByCategory);

export default router;
