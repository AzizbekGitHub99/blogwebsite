import { Fragment, useState, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

import request from "../../../server/request";
import postSchema from "../../../schemas/postSchema";

import MyPostCard from "../../../components/card/my-post";
import Container from "../../../components/container";
import Loading from "../../../components/loading";
import imgURL from "../../../utils/getImgUrl";

import "./style.scss";

const Myposts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [selected, setSelected] = useState(null);
  const [postData, setPostData] = useState(null);

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
    setValue,
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues:{
      title: "",
      description: "",
      tags: "",
      category: "",
      photo: "",
    }
  });

  const refetch = () => {
    setCallback(!callback);
  };

  const onSubmit = async (value) => {
    try {
      setBtnLoading(true);
      const tags = value.tags.split(' ');
      const data = { ...value, photo: photo._id, tags };
      if(selected === null){
        await request.post("post", data);
      }else{
        await request.put(`post/${selected}`, data);
      }
      setShowModal(false);
      reset();
      refetch();
    } finally {
      setBtnLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setPhoto(null);
    setSelected(null)
    reset();
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

  const deletePhoto = async(id) => {
    const checkDeletePhoto = window.confirm("Do you want to delete the picture")
    if(checkDeletePhoto){
      await request.delete(`upload/${id}`);
      setPhoto(null);
      refetch();
    }
  };

  const deletePost = async (id) => {
    const checkDeletePost = window.confirm();
    if (checkDeletePost) {
      await request.delete(`post/${id}`);
      refetch();
    }
  };

  const editPost = async (id) => {
   try{
    setBtnLoading(true);
    const { data } = await request(`post/${id}`);
    setPostData(data);
    setValue("title", postData?.title);
    setValue("description", postData?.description);
    setValue("category", postData?.category._id);
    setValue("tags", [postData?.tags])
    setPhoto(postData?.photo);
    setSelected(id);
    setShowModal(true);
    console.log(data, photo);
   }finally{
    setBtnLoading(false)
   }
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
          {loading ? (
            <div style={{ position: "relative", marginTop: "100px" }}>
              <Loading />
            </div>
          ) : (
            <div className="my-posts__cards">
              {posts?.length === 0 ? (
                <h1>No posts</h1>
              ) : (
                <Fragment>
                  <h1>My posts ({posts?.length})</h1>
                  {posts?.map((el) => (
                    <MyPostCard
                      key={el._id}
                      {...el}
                      deletePost={deletePost}
                      editPost={editPost}
                    />
                  ))}
                </Fragment>
              )}
            </div>
          )}
        </Container>
      </section>
      <div className={`box ${showModal ? "box__show" : ""}`}>
        <div className={`modal ${showModal ? "modal__show" : ""}`}>
          <div>
            <h1>Post data</h1>
            <button className="modal__close" onClick={closeModal}>✕</button>
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

            {photo ? (
              <div className="my-posts__img-box">
                <img
                  src={imgURL(photo)}
                  alt="post"
                  style={{ width: "200px", height: "200px" }}
                />
                <button
                  type="button"
                  className="delete__photo"
                  onClick={() => deletePhoto(photo?._id)}
                  disabled={btnLoading}
                >
                  Delete photo
                </button>
              </div>
            ) : (
              <input
                {...register("photo")}
                type="file"
                accept="image/jpg, image/jpeg"
                onChange={handlePhoto}
              />
            )}

            <button className="modal__form__submit"  type="submit">
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
              {selected ? "Save Updates" :"Add Post"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Myposts;
