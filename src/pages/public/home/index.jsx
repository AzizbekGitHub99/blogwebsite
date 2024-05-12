import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Flex, Spin } from "antd";
import { Link } from "react-router-dom";


import request from "../../../server/request";
import CategoryCard from "../../../components/card/category";
import Container from "../../../components/container";

import "./style.scss";

const HomePage = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latestOnePost, setLatestOnePost] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await request("category");
        setCategoriesData(data);
        const { data: lastone } = await request("post/lastone");
        console.log(lastone);
        setLatestOnePost(lastone);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <section className="hero">
        <Container>
          <p className="hero__category">
            Posted on <span>{latestOnePost?.category.name}</span>
          </p>
          <h3 className="hero__title">{latestOnePost?.title}</h3>
          <p className="hero__info">
            By{" "}
            <span className="hero__info__auth">
              {latestOnePost?.user.first_name} {latestOnePost?.user.last_name}
            </span>{" "}
            | <span className="hero__info__date">{latestOnePost?.user.createdAt.split('T')[0]} </span>
          </p>
          <p className="hero__desc">{latestOnePost?.description}</p>
          <Link className="hero__link">Read More {`>`}</Link>
        </Container>
      </section>
      <section className="categories">
        <Container>
          <h1 className="categories__title">Choose A Catagory</h1>
          {loading ? (
            <Flex align="center" justify="center" gap="middle" style={{marginBottom: "50px"}} >
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
                  spaceBetween: 30,
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
    </div>
  );
};

export default HomePage;
