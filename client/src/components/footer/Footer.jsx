import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="flex border-t border-t-slate-300 py-8 justify-between px-3">
      <span className="text-slate-500">&copy; All Rights Reserved</span>
      <ul className="flex gap-5">
        <li>
          <Link className="inline text-slate-500" to={"/"}>
            Privacy
          </Link>
        </li>
        <li>
          <Link className="inline text-slate-500" to={"/"}>
            Terms
          </Link>
        </li>
        <li>
          <Link className="inline text-slate-500" to={"/"}>
            Cookies Policy
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
