import { Fragment, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./pages/public/home"
import LoginPage from './pages/public/login';
import RegisterPage from "./pages/public/register";
import PostsPage from "./pages/public/posts";
import PublicLayout from "./components/layout/public";
import UserPostsPage from "./pages/user/posts";
import UserAccountPage from './pages/user/account';
import DashboardPage from "./pages/admin/dashboard";
import AdminAccountPage from "./pages/admin/account";
import PrivateLayout from "./components/layout/private";
import NotFoundPage from "./pages/public/not-found";
import { AuthContext } from "./context/auth";

const App = () => {
  const { isAuth, role } = useContext( AuthContext )
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="posts" element={<PostsPage />} />
          {/* <Route path="my-posts" element={token ? <UserPostsPage /> : <Navigate to="/login" />} />
          <Route path="account" element={token ? <UserAccountPage /> : <Navigate to="/login" />} /> */}
          {isAuth ? <Fragment>
            <Route path="my-posts" element={<UserPostsPage />} />
            <Route path="account" element={<UserAccountPage />} />
          </Fragment> : null}
        </Route>
        <Route element={isAuth && role === 'admin' ? <PrivateLayout /> : <Navigate to="/" />}>
          <Route path="admin/dashboard" element={<DashboardPage />} />
          <Route path="admin/account" element={<AdminAccountPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App