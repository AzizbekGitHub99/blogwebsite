import { useState } from "react";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import request from "../../../server/request";
import Container from "../../../components/container";
import registerSchema from "../../../schemas/registerSchema";

import hideImg from "../../../assets/images/hide.png";

import "./style.scss";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hide, setHide] = useState(false)

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
      await request.post("auth/register", value);
      reset();
      toast.success("you have successfully registered in");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const hidePassword = () =>{
    setHide(!hide)
  }

  return (
    <section className="register">
      <Container>
        <h1 className="register__title">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="register__form">
          <input
            type="text"
            placeholder="Firstname"
            {...register("first_name")}
          />
          <p className="register__error">{errors.first_name?.message}</p>
          <input
            type="text"
            placeholder="Lastname"
            {...register("last_name")}
          />
          <p className="register__error">{errors.last_name?.message}</p>
          <input type="text" placeholder="Username" {...register("username")} />
          <p className="register__error">{errors.username?.message}</p>
          <div className="register__password">
            <input
              type={`${hide ? "text" : "password"}`}
              placeholder="Password"
              {...register("password")}
            />
            <button onClick={hidePassword}>
              <img src={hideImg} alt="hide" width={20} />
            </button>
          </div>
          <p className="register__error">{errors.password?.message}</p>
          <button className="register__btn" type="submit">
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
