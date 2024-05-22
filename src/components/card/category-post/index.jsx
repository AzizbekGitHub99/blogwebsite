import PropTypes from 'prop-types'
import demoImg from "../../../assets/images/posts-img-demo.png";


import "./style.scss";
import { useNavigate } from 'react-router-dom';

const CategoryPostCard = ({title, description, category, _id}) => {
  const {name }= category
  const navigate = useNavigate()
  const handleWay = () =>{
    navigate(`/post/${_id}`)
  }

  return (
    <div onClick={handleWay} className="post-card post-cards  ">
      <div className="post-card__left">
        <img src={demoImg} alt={description} />
      </div>
      <div>
        <p className="post-card__category">{name}</p>
        <h3 className="post-card__title">{title}</h3>
        <p className="post-card__desc">
          {description}
        </p>
      </div>
    </div>
  );
};


CategoryPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
}

export default CategoryPostCard;
