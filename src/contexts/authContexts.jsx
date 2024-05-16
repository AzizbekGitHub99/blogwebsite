import { createContext, useState } from "react"

import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { TOKEN } from "../consts";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const token = Cookies.get(TOKEN)
    const defaultRole = Cookies.get('role')
    const [auth, setAuth] = useState(Boolean(token));
    const [role, setRole] = useState(defaultRole || null)
    const state = {auth, role, setRole, setAuth};
  return (
    <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node
}

export default AuthContextProvider