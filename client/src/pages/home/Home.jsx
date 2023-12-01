import { useEffect, useState } from "react";
import Blog from "../../components/blog/Blog";
import Loader from "../../components/loader/Loader";
import axios from "axios";
const Home = () => {
  const [blogs, SetBlogs] = useState([]);
  const [loading, Setloading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BLOG_URL}allblogs`)
      .then((response) => {
        Setloading(false);
        console.log(response);
        SetBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loading && <Loader />}
      {blogs && (
        <div className="blog-container mb-4">
          {blogs.map((blog, index) => {
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
      )}
    </>
  );
};

export default Home;
