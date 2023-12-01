import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./addBlog.scss";
import { categories } from "./categoriesList";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { Toaster, toast } from "react-hot-toast";
import { v4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("art");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState(null);

  const [imageInput, setImageInput] = useState(null);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  //hot-toasts
  const successMsg = (msg) => toast.success(msg);
  const errMsg = (msg) => toast.error(msg);
  const loadingMsg = (msg) =>
    toast.loading(`${msg} is uploading...`, { duration: 2000 });

  useEffect(() => {
    if (imageInput) {
      loadingMsg("blog image");
      const imageRef = ref(storage, `blogs/${v4() + imageInput.name}`);
      uploadBytes(imageRef, imageInput)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setImage(url);
            })
            .catch((error) => {
              return;
            });
        })
        .catch(() => {
          return;
        });
    }
  }, [imageInput]);

  //geting userdata
  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_USER_URL}data`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/auth");
      });
  };

  useEffect(() => getUserData(), []);

  //Adding blog

  const handleAddBlog = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BLOG_URL}addblog`,
        {
          title,
          body,
          image,
          category,
          visibility,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
        successMsg("blog successfully posted");
        setTimeout(() => {
          navigate("/user");
        });
      })
      .catch((error) => {
        setLoading(false);
        errMsg("some error occurred!");
      });
  };

  return (
    <>
      <Toaster />
      {loading && <Loader />}
      {userData && (
        <form
          className="add-form-container flex justify-between"
          onSubmit={handleAddBlog}
        >
          <div className="left">
            <input
              type="text"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              theme="snow"
              style={{ height: "400px" }}
              className="bg-white w-full p-3 border border-gray-300 resize-none outline-none"
              placeholder="Enter body..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="right">
            <div className="optional-blog-form">
              <div className="status mb-2">
                <label htmlFor="">Post status: Draft</label>
              </div>
              <div className="visibity mb-3">
                <label htmlFor="">Blog visibity:</label>
                <select
                  name=""
                  id=""
                  className="ms-1"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  required
                >
                  <option value="public">public</option>
                  <option value="private">private</option>
                </select>
              </div>
              <div className="category mb-3">
                <label htmlFor="">Category:</label>
                <select
                  name=""
                  id=""
                  className="ms-1 capitalize"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {categories.map((category) => {
                    return (
                      <option
                        value={category}
                        className="capitalize"
                        key={category}
                      >
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="iamge-upload">
                <div className="image-upload-area">
                  <input
                    type="file"
                    name=""
                    id=""
                    accept="image/jpeg, image/png, image/jpg ,image/webp"
                    onChange={(e) => setImageInput(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            {image && (
              <div className="image w-full h-60 max-h-60 bg-gray-400 mb-3">
                <img
                  src={image}
                  className="w-full h-full max-h-60 object-cover object-center"
                  alt=""
                />
              </div>
            )}
            <button
              type="submit"
              className="form-action-btn bg-green-400 rounded text-white mt-2"
            >
              Post blog
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddBlog;
