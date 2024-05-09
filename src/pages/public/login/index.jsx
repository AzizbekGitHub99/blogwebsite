import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

import Container from "../../../components/container"
import request from "../../../server/request";
import { ROLE, TOKEN } from "../../../constants";
import { AuthContext } from "../../../context/auth";

const LoginPage = () => {
  const [ loading, setLoading ] = useState( false )
  const { setIsAuth, setRole } = useContext( AuthContext )
  const navigate = useNavigate()
  const login = async ( e ) => {
    try {
      e.preventDefault();
      const { username, password } = e.currentTarget.elements;
      const user = {
        username: username.value,
        password: password.value
      }
      setLoading( true )
      const { data: { token, role } } = await request.post( 'auth/login', user )
      if ( role === 'user' ) {
        navigate( '/my-posts' )
      } else if ( role === 'admin' ) {
        navigate( '/admin/dashboard' )
      }
      Cookies.set( TOKEN, token )
      localStorage.setItem( ROLE, role )
      setIsAuth( true );
      setRole( role )
    } finally {
      setLoading( false )
    }
  }
  return (
    <div>
      <Container>
        <form onSubmit={login}>
          <input type="text" name='username' />
          <input type="password" name='password' />
          <input type="submit" value="Login" disabled={loading} />
        </form>
      </Container>
    </div>
  )
}

export default LoginPage