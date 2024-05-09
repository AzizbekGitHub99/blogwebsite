import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import Container from "../container"

import { TOKEN } from "../../constants"
import { AuthContext } from "../../context/auth"

import "./style.css"

const Header = () => {
  const { isAuth, setIsAuth, setRole } = useContext( AuthContext )
  const navigate = useNavigate()
  const logout = () => {
    Cookies.remove( TOKEN );
    navigate( '/' )
    setIsAuth( false )
    setRole( null )
  }
  return (
    <header>
      <Container>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        {isAuth ? <button onClick={logout}>Logout</button> : <NavLink to="/login">Login</NavLink>}
      </Container>
    </header>
  )
}

export default Header