import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContexts";
import { TOKEN } from "../../consts";
import Cookies from "js-cookie";

import Container from "../container";

import siteLogo from "../../assets/images/site-logo.svg";
import menu from "../../assets/images/hamburger-menu.png";

import "./style.scss";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { auth, setAuth, setRole, role } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    const checkLogout = window.confirm("Do you want to exit ?")
    if(checkLogout){
      Cookies.remove(TOKEN);
      navigate("/");
      setAuth(false)
      setRole(null) 
      handleOpen()
    }
  };

  return (
    <header className="header">
      <Container>
        <nav className="header__nav">
          <Link to="/">
            <img src={siteLogo} alt="site-logo" />
          </Link>
          <div
            className={`header__nav__left ${
              openMenu ? "header__nav__left__hide" : null
            } `}
          >
            <ul onClick={handleOpen} className="header__nav__list">
              <li>
                <Link  className="header__nav__link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link  className="header__nav__link" to="/posts">
                  Blog
                </Link>
              </li>
              <li>
                <Link  className="header__nav__link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link  className="header__nav__link" to="/register">
                  Register
                </Link>
              </li>
              {role === 'admin' ? 
              <li>
              <Link className="header__nav__link" to="/admin/dashboard">
                Admin
              </Link>
            </li>: null}
            {role === 'user' ? 
              <li>
              <Link  className="header__nav__link" to="/account">
                Account
              </Link>
            </li>: null}
            {role === 'user' ? 
              <li>
              <Link  className="header__nav__link" to="/my-posts">
                My posts
              </Link>
            </li>: null}
            </ul>
            {auth ? (
              <button onClick={handleLogout} className="header__nav__btn">
                Log Out
              </button>
            ) : (
              <Link  className="header__nav__btn" to="/login">
                Login
              </Link>
            )}
          </div>
          <button onClick={handleOpen} className="header__menu">
            <img width={38} src={menu} alt="menu" />
          </button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
