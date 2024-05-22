import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import imgURL from '../../../utils/getImgUrl';
import "./style.scss";

const PostCard = ({title, description, category, photo, _id}) => {
  const {name }= category
  const navigate = useNavigate()
  const handleWay = () =>{
    navigate(`/post/${_id}`)
  }
  return (
    <div onClick={handleWay} className="post-card post-cards">
      <div className="post-card__left">
        <LazyLoadImage  src={ imgURL(photo) } alt={description}   onError={({ currentTarget }) => {
              currentTarget.src = "/nophoto.png";
            }}/>
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

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  photo: PropTypes.object,
  _id: PropTypes.string.isRequired,
}

export default PostCard;
