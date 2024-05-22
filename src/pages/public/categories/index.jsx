import { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import request from "../../../server/request";

import Container from "../../../components/container";
import CategoryPostCard from "../../../components/card/category-post";

import "./style.scss";
import Loading from "../../../components/loading";

const CategoriesPage = () => {
  const { categoryId } = useParams();

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const params = { category: categoryId, search };
        setLoading(true);
        const { data } = await request(`category/${categoryId}`);
        setCategoryData(data);
        const {
          data: { data: postData },
        } = await request("post", { params });
        setPostsData(postData);
      } finally {
        setLoading(false);
      }
    };
    getCategory();
  }, [categoryId, search]);

  const handleValue = (e) => {
    setSearch(e.target.value);
  };

  const style = {
    textAlign: "center",
    fontSize: "30px",
    marginTop: "20px"
  }

  return (
    <section className="category">
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {loading ? (
            <div></div>
          ) : (
            <div className="category__info">
              <h1 className="category__title">{categoryData?.name}</h1>
              <p className="category__text">{categoryData?.description}</p>
              <h3> BLOG {` >  ${categoryData?.name}`} </h3>
            </div>
          )}
          {postsData?.length === 0 ? (
            <h1 style={style}>No posts</h1>
          ) : (
            <Fragment>
              <input
                onChange={handleValue}
                type="text"
                placeholder="Searching ..."
                className="posts__search"
              />
              <div className="category__posts">
                {postsData?.map((el) => (
                  <CategoryPostCard key={el._id} {...el} />
                ))}
              </div>
            </Fragment>
          )}
        </Container>
      )}
    </section>
  );
};

export default CategoriesPage;
