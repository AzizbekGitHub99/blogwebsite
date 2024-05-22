import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

import request from "../../../server/request";
import imgURL from "../../../utils/getImgUrl";

import Loading from "../../../components/loading";
import Container from "../../../components/container";

import "./style.scss";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const { data } = await request(`post/${postId}`);
        setPost(data);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [postId]);

  
  return (
    <section className="post">
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <LazyLoadImage
            className="post__img"
            src={imgURL(post?.photo)}
            alt={post?.title}
            onError={({ currentTarget }) => {
              currentTarget.src = "/nophoto.png";
            }}
          />
          <div className="post__container">
            <div>
              <h3 className="post__user">
                {" "}
                {post?.user.first_name} {post?.user.last_name}
              </h3>
              <p className="post__date">
                Posted on {post?.createdAt.split("T")[0]}
              </p>
            </div>
            <h1 className="post__title">{post?.title}</h1>
            <p className="post__tag">
              Startup ({post?.tags.map((el) => `#${el}  `)})
            </p>
            <p className="post__desc">{post?.description}</p>
          </div>
        </Container>
      )}
    </section>
  );
};

export default PostPage;
