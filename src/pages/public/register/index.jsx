import { useContext, useState } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/authContexts";
import { TOKEN } from "../../../consts";
import request from "../../../server/request";
import registerSchema from "../../../schemas/register";

import Container from "../../../components/container";

import hideImg from "../../../assets/images/hide.png";

import "./style.scss";

const RegisterPage = () => {
  const { setAuth, setRole } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (value) => {
    try {
      setLoading(true);
      const {
        data: { token, role },
      } = await request.post("auth/register", value);
      if (role === "user") {
        navigate("/my-posts");
        toast.success("you have successfully logged in");
      } else if (role === "admin") {
        toast.success("you have successfully logged in");
        navigate("/admin/dashboard");
      }
      Cookies.set(TOKEN, token);
      Cookies.set("role", role);
      request.defaults.headers.Authorization = "Bearer " + token;

      setAuth(true);
      setRole(role);
      reset();
    } finally {
      setLoading(false);
    }
  };

  const hidePassword = () => {
    setHide(!hide);
  };

  return (
    <section className="register">
      <Container>
        <h1 className="register__title">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="register__form">
          <input
            type="text"
            placeholder="Firstname"
            {...register("first_name")}
            className={`register__form__input ${
              errors.first_name ? "register__form__input__valid" : null
            }`}
          />
          <p className="register__error">{errors.first_name?.message}</p>
          <input
            type="text"
            placeholder="Lastname"
            {...register("last_name")}
            className={`register__form__input ${
              errors.last_name ? "register__form__input__valid" : null
            }`}
          />
          <p className="register__error">{errors.last_name?.message}</p>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className={`register__form__input ${
              errors.username ? "register__form__input__valid" : null
            }`}
          />
          <p className="register__error">{errors.username?.message}</p>
          <div className="register__password">
            <input
              type={`${hide ? "text" : "password"}`}
              placeholder="Password"
              {...register("password")}
              className={`register__form__input ${
                errors.password ? "register__form__input__valid" : null
              }`}
            />
            <button type="button" onClick={hidePassword}>
              <img src={hideImg} alt="hide" width={20} />
            </button>
          </div>
          <p className="register__error">{errors.password?.message}</p>
          <button
            disabled={loading}
            className={`register__btn ${
              loading ? "register__btn__disabled" : null
            }`}
            type="submit"
          >
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            ) : null}
            Register
          </button>
        </form>
      </Container>
    </section>
  );
};

export default RegisterPage;
