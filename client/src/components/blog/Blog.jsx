import "./blog.scss";
import { Link } from "react-router-dom";

export default function Blog({ titile, body, image, link }) {
  return (
    <div className={`blog-card mx-auto`}>
      <div className="blog-image bg-gray-400 relative">
        <div className="image-back-shadow absolute bg-green-200"></div>
        <img src={image} alt="" />
      </div>
      <div className="text">
        <h1>
          {titile}
          {titile.length > 120 && "..."}
        </h1>
        <p>{body}...</p>
        <Link
          to={`${link}`}
          className="capitalize border border-green-200 rounded"
        >
          read more
        </Link>
      </div>
    </div>
  );
}
