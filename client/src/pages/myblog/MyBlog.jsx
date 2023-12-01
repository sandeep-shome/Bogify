import "./myBlog.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { Toaster, toast } from "react-hot-toast";

const MyBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  const successMsg = (msg) => toast.success(msg);
  const errMsg = (msg) => toast.error(msg);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}userblogsinfo/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setBlogData(response.data);
        console.log(response.data);
        document.title = response.data[0].title;
        setLoading(false);
      })
      .catch((error) => {
        navigate("/");
      });
  }, []);

  const handleRemovePost = () => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_BLOG_URL}removeblog/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        successMsg("blogs successfully removed");
        setTimeout(() => {
          navigate("/user");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        errMsg("something error occurred!");
      });
  };
  return (
    <>
      <Toaster />
      {loading && <Loader />}
      {blogData && (
        <div className="my-blog-container w-full px-2">
          <div className=" w-3/4 mx-auto pb-3">
            <div className="my-blog-iamge w-full h-72 max-h-72 flex items-center justify-center overflow-hidden bg-gray-400">
              <img
                src={blogData[0].image}
                alt=""
                className="w-full h-full max-h-72 object-cover object-center mx-auto"
              />
            </div>
            <div className="user-actions my-5 flex items-center gap-3">
              <Link
                to={`/update-blog/${id}`}
                className="w-32 h-10 bg-green-400 text-white rounded flex items-center justify-center"
              >
                <i className="fa-solid fa-pen me-2"></i> Edit post
              </Link>
              <button
                className="w-32 h-10 bg-red-400 text-white rounded"
                onClick={handleRemovePost}
              >
                <i className="fa-solid fa-trash me-1"></i> Drop post
              </button>
            </div>
            <h1 className="text-xl font-bold my-5">{blogData[0].title}</h1>
            <p>{blogData[0].body}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBlog;
