import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";

export default function getUserData() {
  const userContext = useContext(UserContext);
  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_USER_URL}/data`, {
        withCredentials: true,
      })
      .then((response) => {
        userContext.setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
