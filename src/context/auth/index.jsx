import { createContext, useState } from "react"
import Cookies from 'js-cookie'
import { ROLE, TOKEN } from "../../constants";

export const AuthContext = createContext();

const AuthContextProvider = ( { children } ) => {
  const token = Cookies.get( TOKEN )
  const defaultRole = localStorage.getItem( ROLE )
  const [ isAuth, setIsAuth ] = useState( Boolean( token ) );
  const [ role, setRole ] = useState( defaultRole || null );
  const state = { isAuth, role, setIsAuth, setRole };
  return <AuthContext.Provider value={state}>
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider