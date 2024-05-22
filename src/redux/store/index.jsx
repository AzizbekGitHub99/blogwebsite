import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import PropTypes from "prop-types"
import { thunk } from "redux-thunk"
import root from "../reducers/root"

const store = createStore(root, applyMiddleware(thunk))

const StoreProvider = ({children}) => {
  return (
    <Provider store={store} >{children}</Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default StoreProvider