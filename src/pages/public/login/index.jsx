import { Fragment, useContext, useState } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';


import request from "../../../server/request";
import Container from "../../../components/container";
import loginSchema from "../../../schemas/loginSchema";
import { TOKEN } from "../../../consts";

import "./style.scss";
import { AuthContext } from "../../../contexts/authContexts";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {setAuth , setRole} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const {data: { token, role }} = await request.post("auth/login", values);
      if (role === "user") {
        navigate("/my-posts");
        toast.success('you have successfully logged in')
      } else if (role === "admin") {
        toast.success('you have successfully logged in')
        navigate("/admin/dashboard");
      }
      Cookies.set(TOKEN, token)
      Cookies.set('role', role)
      setAuth(true)
      setRole(role)
      reset();
    }finally {
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <div className="login">
        <Container>
          <div className="login__container">
            <h1 className="login__title">Login</h1>
            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="login__inp"
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              <p style={{ color: "red" }}>{errors.username?.message}</p>
              <input
                className="login__inp"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <p style={{ color: "red" }}>{errors.password?.message}</p>
              <button disabled={loading} className="login__btn" type="submit">
                {loading ? <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    /> 
                  }
                />: null}
                Login
              </button>
            </form>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default LoginPage;
