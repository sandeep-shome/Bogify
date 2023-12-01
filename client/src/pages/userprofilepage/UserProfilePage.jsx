import React, { useContext, useEffect, useState } from "react";
import "./userProfilePage.scss";
import Blog from "../../components/blog/Blog";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { format } from "timeago.js";
import { blog } from "../../../../server/controllers/blog";

const UserProfilePage = () => {
  const userContext = useContext(UserContext);
  const userData = userContext.userData;

  const navigate = useNavigate();

  const [blogs, SetBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlogs = () => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}userblogs`, {
        withCredentials: true,
      })
      .then((res) => {
        SetBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_USER_URL}data`, {
        withCredentials: true,
      })
      .then((response) => {
        userContext.setUserData(response.data);
        getBlogs();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/auth");
      });
  };

  useEffect(() => getUserData(), []);

  return (
    <>
      {loading && <Loader />}
      {userData && (
        <div className="user-profile-page-container">
          <div className="user-profile-pictures w-full">
            <div className="user-cover-picture w-full h-72 relative flex items-center justify-center bg-gray-400">
              <img
                src={userData.coverpicture}
                alt=""
                className="w-full max-h-72 h-full object-cover object-center"
              />
              <div
                className="user-profile-picture-main w-28 h-28 rounded-full bg-white absolute border border-slate-500 overflow-hidden flex items-center justify-center"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: "-56px",
                  border: "4px solid rgb(148,163,184)",
                }}
              >
                <img
                  src={userData.profilepicture}
                  alt=""
                  className="rounded-full w-24 h-24 overflow-hidden object-cover object-center max-h-24 bg-gray-400"
                />
              </div>
            </div>
          </div>
          <h3 className="mt-20 text-center text-xl font-bold flex items-center justify-center">
            {userData.username}
            {userData.varified && (
              <span className="material-symbols-outlined text-xl block ms-1 text-green-400">
                verified
              </span>
            )}
          </h3>
          <span className="text-center block mt-1">{userData.bio}</span>
          <span className="text-center block text-slate-600 mt-1">
            Joined {format(userData.createdAt)}
          </span>
          <Link
            to={"/edit-profile"}
            className=" w-32 h-10 rounded bg-green-400 text-white mx-auto flex items-center justify-center mt-3"
          >
            <i className="fa-solid fa-pen me-2"></i>
            Edit profile
          </Link>
          {blogs && (
            <>
              <div className="user-blog-container w-full mt-12">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Your most recent blogs
                </h3>
                {blogs.map((blog) => {
                  if (blog.visibility === "public") {
                    return (
                      <Blog
                        titile={blog.title.substring(0, 120)}
                        body={blog.body.substring(0, 400)}
                        image={blog.image}
                        link={`/my-blog/${blog._id}`}
                        key={blog._id}
                      />
                    );
                  }
                })}
              </div>
              <div className="user-draft-blog-container w-full mt-16">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  {"Your private blog(s)"}
                </h3>
                {blogs.map((blog) => {
                  if (blog.visibility === "private") {
                    return (
                      <Blog
                        titile={blog.title.substring(0, 120)}
                        body={blog.body.substring(0, 400)}
                        image={blog.image}
                        link={`/my-blog/${blog._id}`}
                        key={blog._id}
                      />
                    );
                  }
                })}
              </div>
            </>
          )}
          {!blogs && (
            <div className="w-full h-40 mt-10">
              <span className="block text-gray-500 mt-20 text-center">
                Create your first Blog!
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
