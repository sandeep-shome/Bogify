import "./updatePost.scss";
import { categories } from "../addblog/categoriesList";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { Toaster, toast } from "react-hot-toast";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState(null);
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("art");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState(null);

  const [imageInput, setImageInput] = useState(null);

  const [loading, setLoading] = useState(false);

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

  //geting blogdata
  const getBlogData = () => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}userblogsinfo/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTitle(response.data[0].title);
        setBody(response.data[0].body);
        setImage(response.data[0].image);
        setCategory(response.data[0].category);
        setVisibility(response.data[0].visibility);
        document.title = response.data[0].title;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/auth");
      });
  };

  useEffect(() => getBlogData(), []);

  //updating blog

  const handleUpdateBlog = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_BLOG_URL}updateblog/${id}`,
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
      {title && (
        <form
          className="add-form-container flex justify-between"
          onSubmit={handleUpdateBlog}
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
                    accept="image/jpeg, image/png, image/jpg, image/webp"
                    onChange={(e) => setImageInput(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            {image && (
              <div className="image w-full h-60 max-h-60 bg-gray-400 mb-3">
                <img
                  src={image}
                  className="w-full h-full max-h-60 object-vcoer object-center"
                  alt=""
                />
              </div>
            )}
            <button
              type="submit"
              className="form-action-btn bg-green-400 rounded text-white mt-2"
            >
              Update blog
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdatePost;
