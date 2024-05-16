import React from "react";

import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import AuthContextProvider from "./contexts/authContexts.jsx";

import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    <ToastContainer />
  </React.StrictMode>
);
