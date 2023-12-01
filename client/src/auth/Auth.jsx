import axios from "axios";
import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Auth() {
  const userContext = useContext(UserContext);
  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_USER_URL}data`, {
        withCredentials: true,
      })
      .then((response) => {
        userContext.setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);
}
