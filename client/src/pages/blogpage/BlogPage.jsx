import "./blogPage.scss";
import MoreBlogCard from "../../components/moreBlogCard/MoreBlogCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { format } from "timeago.js";

const blogPage = () => {
  const { id } = useParams();

  const [blogData, SetBlogData] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [moreBlogs, setMoreBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMoreBlogs = (cat) => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}moreblogs/${cat}`)
      .then((res) => {
        setMoreBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}bloginfo/${id}`)
      .then((response) => {
        SetBlogData(response.data);
        setUserId(response.data.userid);
        setUserName(response.data.username);
        setUserImage(response.data.userimage);
        getMoreBlogs(response.data.category);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      {loading && <Loader />}
      {blogData && (
        <div className="blog-container flex justify-between ">
          <div className="recent-blog-container">
            <div className="blog-iamge bg-gray-400">
              <img src={blogData.image} alt="" className="h-full" />
            </div>
            <Link
              to={`/profile/${userId}`}
              className="author-info flex items-center gap-2 my-5 w-48"
            >
              <div className="profile-picture w-10 h-10 flex items-center justify-center bg-slate-500 rounded-full">
                <img src={userImage} alt="" className="" />
              </div>
              <div className="author-name-date">
                <h6 className="">{userName}</h6>
                <span>posted {format(blogData.createdAt)}</span>
              </div>
            </Link>
            <h1>{blogData.title}</h1>
            <p>{blogData.body}</p>
          </div>
          <div className="more-blogs-container">
            <h3 className=" text-gray-700 mb-8">Other posts you may like</h3>
            {moreBlogs &&
              moreBlogs.map((blog) => {
                if (blog._id != blogData._id) {
                  return (
                    <MoreBlogCard
                      key={blog._id}
                      image={blog.image}
                      title={blog.title}
                      link={blog._id}
                    />
                  );
                }
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default blogPage;
