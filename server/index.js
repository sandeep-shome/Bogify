import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { initializeApp } from "firebase/app";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import firebaseConfig from "./configs/firebase.config.js";

/* configurations */

const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
const firebase = initializeApp(firebaseConfig);

/* routes */

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);

//testing routes
app.get("/", (req, res) => {
  res.send("server is running");
});

//mongodb configuration

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT || 4001, () => {
      console.log("server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
