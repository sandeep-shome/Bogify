import RootLayout from "./layouts/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddBlog from "./pages/addblog/AddBlog";
/* import { Home } from "./AllPages"; */
import Home from "./pages/home/Home";
import BlogPage from "./pages/blogpage/BlogPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import UserProfilePage from "./pages/userprofilepage/UserProfilePage";
import EditProfilePage from "./pages/editprofilepage/EditProfilePage";
import PasswordUpdatePage from "./pages/passwordupdate/PasswordUpdatePage";
import UpdatePost from "./pages/updatepost/UpdatePost";
import MyBlog from "./pages/myblog/MyBlog";
import CategoryPage from "./pages/categorypage/CategoryPage";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./pages/authform/SignUp";
import SignIn from "./pages/authform/SignIn";
import Logout from "./pages/logout/Logout";
import ErrorPage from "./pages/errorpage/ErrorPage";
import UserContextProvider from "./context/UserContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "add-blog",
          element: <AddBlog />,
        },
        {
          path: "blog/:id",
          element: <BlogPage />,
        },
        {
          path: "profile/:id",
          element: <ProfilePage />,
        },
        {
          path: "user",
          element: <UserProfilePage />,
        },
        {
          path: "edit-profile",
          element: <EditProfilePage />,
        },
        {
          path: "change-password",
          element: <PasswordUpdatePage />,
        },
        {
          path: "update-blog/:id",
          element: <UpdatePost />,
        },
        {
          path: "my-blog/:id",
          element: <MyBlog />,
        },
        {
          path: "category/:cat",
          element: <CategoryPage />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "/auth",
      exact: true,
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
