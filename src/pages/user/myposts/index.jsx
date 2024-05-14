import { Fragment, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

import MyPostCard from "../../../components/card/my-post";
import Container from "../../../components/container";

import "./style.scss";
import request from "../../../server/request";
import postSchema from "../../../schemas/postSchema";
import { Spin } from "antd";

const Myposts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await request("post/user");
        setPosts(data);
        const {
          data: { data: res },
        } = await request("category");
        setCategory(res);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [callback]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,

  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const refetch = () =>{
    setCallback(!callback)
  }

  const onSubmit = async (value) => {
    try {
      setBtnLoading(true);
      const data = { ...value, photo: photo._id };
      await request.post("post", data);
      setShowModal(false);
      reset()
      refetch();
    } finally {
      setBtnLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePhoto = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const { data } = await request.post("upload", formData);
    setPhoto(data);
  };

  return (
    <Fragment>
      <section className="my-posts">
        <Container>
          <div className="my-posts__box">
            <div>
              <h1>My posts</h1>
              <button onClick={openModal} className="my-posts__btn">
                Add post
              </button>
            </div>
            <span></span>
            <input type="text" placeholder="Searching..." />
          </div>
          {
            loading ? 
            "Loading..." : 
            <div className="my-posts__cards">
            {posts?.length === 0 ? (
              <h1>No posts</h1>
            ) : (
              posts?.map((el) => <MyPostCard key={el._id} {...el} />)
            )}
          </div>
          }
        </Container>
      </section>
      <div className={`box ${showModal ? "box__show" : ""}`}>
        <div className={`modal ${showModal ? "modal__show" : ""}`}>
          <div>
            <h1>Posts data</h1>
            <button onClick={closeModal}>X</button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="modal__form">
            <input
              type="text"
              placeholder="Post Title"
              {...register("title")}
            />
            <p>{errors.title?.message}</p>

            <input
              type="text"
              placeholder="Post description"
              {...register("description")}
            />
            <p>{errors.description?.message}</p>

            <input type="text" placeholder="Post tags" {...register("tags")} />
            <p>{errors.tags?.message}</p>

            <select {...register("category")}>
              <option value="">Select category</option>
              {category?.map((el) => (
                <option key={el._id} value={el._id}>
                  {el.name}
                </option>
              ))}
            </select>
            <p>{errors.category?.message}</p>

            <input
              {...register("photo")}
              type="file"
              accept="image/jpg, image/jpeg"
              onChange={handlePhoto}
            />

            <button type="submit">
              {btnLoading ? (
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
              Add Post
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Myposts;
