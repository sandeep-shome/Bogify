import React, { useContext, useEffect, useState } from "react";
import "./profilePage.scss";
import Blog from "../../components/blog/Blog";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import Loader from "../../components/loader/Loader";

const ProfilePage = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlogs = (e) => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}getblogs/${e.email}`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_USER_URL}profile/${id}`)
      .then((response) => {
        setUserData(response.data);
        getBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => getUserData(), []);

  return (
    <>
      {loading && <Loader />}
      {userData && (
        <div className="profile-page-container">
          <div className="profile-pictures w-full">
            <div className="cover-picture w-full h-72 relative flex items-center justify-center">
              <img
                src={userData.coverpicture}
                alt=""
                className="w-full max-h-72 object-cover object-center"
              />
              <div
                className="profile-picture-main w-28 h-28 rounded-full bg-white absolute border border-slate-500 overflow-hidden flex items-center justify-center"
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
                  className="rounded-full w-24 h-24 overflow-hidden object-cover object-center max-h-24"
                />
              </div>
            </div>
          </div>
          <h3 className="mt-20 text-center text-xl font-bold flex items-center justify-center">
            {userData.username}
            <span className="material-symbols-outlined text-xl block ms-1 text-green-400">
              verified
            </span>
          </h3>
          <span className="text-center block mt-1">{userData.bio}</span>
          <span className="text-center block text-slate-600 mt-1">
            Joined {format(userData.createdAt)}
          </span>
          <div className="blog-container w-full mt-12">
            {blogs &&
              blogs.map((blog) => {
                return (
                  <Blog
                    titile={blog.title.substring(0, 120)}
                    body={blog.body.substring(0, 400)}
                    image={blog.image}
                    link={`/blog/${blog._id}`}
                    key={blog._id}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
