import React from "react";
import "./moreBlogCard.scss";
import { Link } from "react-router-dom";
const MoreBlogCard = ({ title, image, link }) => {
  return (
    <div className="more-blog-card w-full mb-6">
      <div
        className="blog-image w-full flex items-center justify-center h-48 bg-gray-400"
        style={{ overflow: "hidden", maxHeight: "192px" }}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            maxHeight: "192px",
          }}
        />
      </div>
      <h2
        className=" text-xl text-slate-800 mt-2"
        style={{ fontWeight: "bold" }}
      >
        {title.substring(0, 120)}
        {title.length > 120 && "..."}
      </h2>
      <Link
        to={`/blog/${link}`}
        className="capitalize border border-green-400 text-green-400 rounded flex items-center justify-center mt-4"
        style={{
          width: "100px",
          height: "40px",
        }}
      >
        read more
      </Link>
    </div>
  );
};

export default MoreBlogCard;
