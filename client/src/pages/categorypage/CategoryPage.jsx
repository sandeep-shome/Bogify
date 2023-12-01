import React, { useEffect, useState } from "react";
import Blog from "../../components/blog/Blog";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
const CategoryPage = () => {
  const { cat } = useParams();

  const [blogs, SetBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}blogbycategory/${cat}`)
      .then((response) => {
        SetBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        return;
      });
  }, [cat]);
  return (
    <>
      {loading && <Loader />}

      <div className="blog-container mb-4">
        {blogs &&
          blogs.map((blog, index) => {
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
        {!blogs && (
          <span className="block text-center text-gray-400">
            No blog yet posted on this category
          </span>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
