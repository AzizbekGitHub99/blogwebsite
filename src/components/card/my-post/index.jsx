import PropTypes from 'prop-types'

// import demoImg from "../../../assets/images/posts-img-demo.png";

import "./style.scss";
import imgURL from '../../../utils/getImgUrl';

const MyPostCard = ({title, _id, category, description, photo, editPost, deletePost}) => {
  const {name} = category
  return (
    <div className="post-card">
      <div className="post-card__left">
        <img src={imgURL(photo)} alt="" />
      </div>
      <div>
        <p className="post-card__category">{name}</p>
        <h3 className="post-card__title">{title}</h3>
        <p className="post-card__desc">
          {description}
        </p>
        <button onClick={()=> editPost(_id)} className='post-card__edit-btn'>Edit</button>
        <button onClick={()=> deletePost(_id)} className='post-card__del-btn'>Delete</button>
      </div>
    </div>
  );
};

MyPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

export default MyPostCard;
