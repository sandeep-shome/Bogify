import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./authForm.scss";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import axios from "axios";

const SignIn = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [isPassword, SetIsPassword] = useState(true);
  const [isLoading, SetIsLoading] = useState(false);

  const errMsg = (msg) => toast.error(msg);

  const navigate = useNavigate();

  const handleSignin = (ev) => {
    ev.preventDefault();
    SetIsLoading(true);
    if (email === "" || password === "") {
      errMsg("All fields are required");
      SetIsLoading(false);
    } else {
      axios
        .post(
          `${import.meta.env.VITE_AUTH_URL}signin`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          SetIsLoading(false);
          errMsg("Unmatched credentials!");
          console.error(err);
        });
    }
  };

  return (
    <>
      <Toaster />
      {isLoading && <Loader />}
      <form
        action=""
        className="auth-form w-96 flex flex-col items-center"
        onSubmit={handleSignin}
      >
        <div className="logo bg-green-200 rounded-full mb-2">
          <Link to={"/"}>Blogify.</Link>
        </div>
        <h1 className="mb-4 capitalize font-semibold text-lg text-slate-600">
          sign in your account
        </h1>
        <input
          type="email"
          placeholder="Email Address"
          className="w-4/5 h-10 border border-gray-300 rounded ps-3 mb-2 outline-none"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <div className="password-box w-4/5 h-10 mb-2 relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-10 border border-gray-300 rounded ps-3 outline-none pe-9 password-input"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          <i
            className="fa-regular fa-eye absolute right-3 text-slate-500 top-1/2 cursor-pointer password-protector z-10"
            style={{ transform: "translateY(-50%)" }}
            onClick={() => {
              const passwordInput = document.querySelector(".password-input");
              const passwordProtector = document.querySelector(
                ".password-protector"
              );
              if (isPassword) {
                passwordInput.setAttribute("type", "text");
                passwordProtector.classList.replace("fa-eye", "fa-eye-slash");
                SetIsPassword(false);
              } else {
                passwordInput.setAttribute("type", "password");
                passwordProtector.classList.replace("fa-eye-slash", "fa-eye");
                SetIsPassword(true);
              }
            }}
          />
        </div>
        <button
          type="submit"
          className="w-4/5 h-10 bg-green-400 text-white rounded mt-4"
        >
          Sign In
        </button>
        <span className="block mt-3">
          Does't have account?
          <Link to={"/auth/signup"} className="text-green-400 ms-1">
            Sign up
          </Link>
        </span>
      </form>
    </>
  );
};

export default SignIn;
