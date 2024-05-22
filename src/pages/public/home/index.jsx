import { Fragment, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Flex, Spin } from "antd";
import { Link } from "react-router-dom";

import imgURL from "../../../utils/getImgUrl";
import request from "../../../server/request";

import CategoryCard from "../../../components/card/category";
import Container from "../../../components/container";
import PopularPostCard from "../../../components/card/popular-post";
import Loading from "../../../components/loading";

import "./style.scss";

const HomePage = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latestOnePost, setLatestOnePost] = useState(null);
  const [lastOnesPost, setLastOnesPost] = useState(null);
  
  const img = imgURL(latestOnePost?.photo);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await request("category", {params : {limit: 100}});
        setCategoriesData(data);
        const { data: lastone } = await request("post/lastone");
        setLatestOnePost(lastone);
        const { data: lastones } = await request("post/lastones");
        setLastOnesPost(lastones)
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);


  return (
    <Fragment>
      {loading ? <Loading /> :
      <Fragment>
      <section
        className="hero"
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: " no-repeat",
          backgroundSize: "cover",
          maxWidth: "1440px",
          width: "100%",
          height: "720px",
          margin: "0 auto",
        }}
      >   
        <Container>
          {
          loading ? <Loading /> 
          :<Fragment>
            <p className="hero__category">
              Posted on <span>{latestOnePost?.category.name}</span>
            </p>
            <h3 className="hero__title">{latestOnePost?.title}</h3>
            <p className="hero__info">
              By{" "}
              <span className="hero__info__auth">
                {latestOnePost?.user.first_name} {latestOnePost?.user.last_name}
              </span>{" "}
              |{" "}
              <span className="hero__info__date">
                {latestOnePost?.user.createdAt.split("T")[0]}{" "}
              </span>
            </p>
            <p className="hero__desc">{latestOnePost?.description}</p>
          </Fragment>          
          }
          <Link to={`/post/${latestOnePost?._id}`} className="hero__link">Read More {`>`}</Link>
        </Container>
      </section>
      <section className="popular-posts">
        <Container>
          <h1 className="popular-posts__title">Popular Posts</h1>
          <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                240: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1136: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {lastOnesPost?.map((el) => (
                <SwiperSlide key={el._id}>
                  <PopularPostCard {...el} />
                </SwiperSlide>
              ))}
            </Swiper>
        </Container>
      </section>
      <section className="categories">
        <Container>
          <h1 className="categories__title">Choose A Catagory</h1>
          {loading ? (
            <Flex
              align="center"
              justify="center"
              gap="middle"
              style={{ marginBottom: "50px" }}
            >
              <Spin size="large" />
            </Flex>
          ) : (
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                240: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1136: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper"
            >
              {categoriesData?.map((el) => (
                <SwiperSlide key={el._id}>
                  <CategoryCard {...el} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Container>
      </section>
      </Fragment>}
    </Fragment>
  );
};

export default HomePage;
