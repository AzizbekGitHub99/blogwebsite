import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/public/home";
import PostsPage from "./pages/public/posts";
import AboutPage from "./pages/public/about";
import RegisterPage from "./pages/public/register";
import LoginPage from "./pages/public/login";
import PublicLayout from "./components/layout/public";
import PostPage from "./pages/public/post";
import CategoriesPage from "./pages/public/categories";
import Dashboard from "./pages/admin/dashboard";
import AdminPosts from "./pages/admin/posts";
import AdminCategories from "./pages/admin/categories";
import Users from "./pages/admin/users";
import AdminLayout from "./components/layout/admin";
import Myposts from "./pages/user/myposts";
import Account from "./pages/user/account";
import { Fragment, useContext } from "react";
import { AuthContext } from "./contexts/authContexts";

const App = () => {
  const { auth, role } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="post/:postId" element={<PostPage />} />
          <Route path="category/:categoryId" element={<CategoriesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          {auth ? (
            <Fragment>
              <Route path="my-posts" element={<Myposts />} />
              <Route path="user-account" element={<Account />} />
            </Fragment>
          ) : null}
        </Route>
        {role && auth ? 
        <Route path="/admin/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="users" element={<Users />} />
      </Route> : null}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
