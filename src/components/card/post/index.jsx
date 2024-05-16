import PropTypes from 'prop-types'


import "./style.scss";
import imgURL from '../../../utils/getImgUrl';

const PostCard = ({title, description, category, photo}) => {
  const {name }= category
  return (
    <div className="post-card">
      <div className="post-card__left">
        <img src={ imgURL(photo) } alt={description} />
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
  photo: PropTypes.object
}

export default PostCard;
