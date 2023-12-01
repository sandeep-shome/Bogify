import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./authForm.scss";
import Loader from "../../components/loader/Loader";
import { Toaster, toast } from "react-hot-toast";

const SignUp = () => {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordState, SetPasswordState] = useState(true);
  const [isLoading, SetIsLoading] = useState(false);

  const navigate = useNavigate();

  const successMsg = () => toast.success("Your account has been created");
  const errMsg = () => toast.error("something went wrong!");

  const handleSignUp = (ev) => {
    ev.preventDefault();
    SetIsLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_AUTH_URL}signup`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        SetIsLoading(false);
        successMsg();
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      })
      .catch((err) => {
        SetIsLoading(false);
        errMsg();
      });
  };

  return (
    <>
      <Toaster />
      {isLoading && <Loader />}
      <form
        action=""
        className="auth-form w-96 flex flex-col items-center"
        onSubmit={handleSignUp}
      >
        <div className="logo bg-green-200 rounded-full mb-2">
          <Link to={"/"}>Blogify.</Link>
        </div>
        <h1 className="mb-4 capitalize font-semibold text-lg text-slate-600">
          create new account
        </h1>
        <input
          type="text"
          placeholder="Name"
          className="w-4/5 h-10 border border-gray-300 rounded ps-3 mb-2 outline-none"
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-4/5 h-10 border border-gray-300 rounded ps-3 mb-2 outline-none"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <div className="password-box w-4/5 h-10 rounded relative mb-2 outline-none">
          <input
            type="password"
            placeholder="Password"
            className="pass-input w-full outline-none h-10 border ps-3 border-gray-300 rounded pe-9"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          ></input>
          <i
            className="fa-regular fa-eye absolute right-3 text-slate-500 top-1/2 cursor-pointer password-protector"
            style={{ transform: "translateY(-50%)" }}
            onClick={() => {
              const passwordInput = document.querySelector(".pass-input");
              const passwordProtector = document.querySelector(
                ".password-protector"
              );
              if (passwordState) {
                passwordInput.setAttribute("type", "text");
                passwordProtector.classList.replace("fa-eye", "fa-eye-slash");
                SetPasswordState(false);
              } else {
                passwordInput.setAttribute("type", "password");
                passwordProtector.classList.replace("fa-eye-slash", "fa-eye");
                SetPasswordState(true);
              }
            }}
          ></i>
        </div>
        <button
          type="submit"
          className="w-4/5 h-10 bg-green-400 text-white rounded mt-4"
        >
          Sign Up
        </button>
        <span className="block mt-3">
          Already have account?
          <Link to={"/auth"} className="text-green-400 ms-1">
            Sign in
          </Link>
        </span>
      </form>
    </>
  );
};

export default SignUp;
