import PropTypes from 'prop-types'

import icon from "../../../assets/images/Icon.png";

import './style.scss';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({name, description, _id}) => {
  const navigate = useNavigate()
  const handleCategory = (id) =>{
    navigate(`/category/${id}`)
  }
  return (
    <div onClick={()=> handleCategory(_id)} className="category-card">
      <img className="category-card__img" src={icon} alt="" />
      <h1 className="category-card__title">{name}</h1>
      <p className="category-card__text">{description}</p>
    </div>
  );
};

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
}

export default CategoryCard;
