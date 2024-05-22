import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import imgURL from "../../../utils/getImgUrl";

import "./style.scss";

const PopularPostCard = ({ title, description, user, photo, _id }) => {
  const { first_name, last_name, createdAt } = user;
  const navigate = useNavigate()
  const handleWay = () =>{
    navigate(`/post/${_id}`)
  }
  return (
    <div onClick={handleWay} className="popular-post-card">
      <img
        className="popular-post-card__img"
        src={imgURL(photo)}
        alt={title}
        onError={({ currentTarget }) => {// prevents looping
          currentTarget.src = "/nophoto.png";
        }}
      />
      <div>
        <p className="popular-post-card__info">
          By{" "}
          <span className="popular-post-card__user">
            {first_name} {last_name}{" "}
          </span>{" "}
          l
          <span className="popular-post-card__date">
            {" "}
            {createdAt.split("T")[0]}{" "}
          </span>
        </p>
        <h3 className="popular-post-card__title">{title}</h3>
        <p className="popular-post-card__desc">{description}</p>
      </div>
    </div>
  );
};

PopularPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
};

export default PopularPostCard;
