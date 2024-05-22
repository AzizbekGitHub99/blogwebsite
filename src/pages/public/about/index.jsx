import { Fragment } from "react";

import Container from "../../../components/container";

import teamImg from "../../../assets/images/team.png";
import blogImg from "../../../assets/images/blog.png";

import "./style.scss";
import Aos from "aos";

const AboutPage = () => {
  Aos.init();
  return (
    <Fragment>
      <section className="mission">
        <Container>
          <div data-aos="fade-up" data-aos-duration="700" className="mission__container">
            <div data-aos="fade-up">
              <p className="mission__desc">Our mision</p>
              <h1 className="mission__title">
                Creating valuable content for creatives all around the world
              </h1>
              <p className="mission__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
            <div>
              <p className="mission__desc">Our Vision</p>
              <h1 className="mission__title">
                A platform that empowers individuals to improve
              </h1>
              <p className="mission__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="team">
        <Container>
          <div  className="team__container">
            <div data-aos="fade-down">
              <h3 className="team__title">Our team of creatives</h3>
              <p className="team__desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <p className="team__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
            <div className="team__container__right">
              <img data-aos="fade-up" src={teamImg} alt="team " />
            </div>
          </div>
        </Container>
      </section>
      <section className="blog">
        <Container>
          <div className="blog__container">
            <div className="blog__container__right">
              <img data-aos="fade-up" src={blogImg} alt="blog " />
              <div></div>
            </div>
            <div data-aos="fade-down">
              <h3 className="blog__title">Why we started this Blog</h3>
              <p className="blog__desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <p className="blog__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default AboutPage;
