import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../../../components/container";
import CategoryPostCard from "../../../components/card/category-post";

import request from "../../../server/request";


import "./style.scss";

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData]= useState(null)
  const [postsData, setPostsData] = useState(null);
  const [search, setSearch] = useState('')

  const handleValue = (e) => {
    setSearch(e.target.value)
  }

  useEffect(
    () =>{
      const getCategory = async() =>{
        const params = {category: categoryId, search}
        const {data} = await request(`category/${categoryId}`)
        setCategoryData(data)
        const {data: {data: postData}} = await request('post', {params})
        setPostsData(postData)
      }
      getCategory()
    },[categoryId, search]
  )

  // console.log(postsData);
  return (
    <section className="category">
      <Container>
        <div className="category__info">
          <h1 className="category__title">{categoryData?.name}</h1>
          <p className="category__text">
            {categoryData?.description}
          </p>
          <h3> BLOG  {` >  ${categoryData?.name}`}  </h3>
        </div>
        <input onChange={handleValue} type="text" placeholder="Searching ..." className="posts__search" />
        <div className="category__posts">
          {postsData?.map(el => <CategoryPostCard key={el._id}  {...el}/>)}
        </div>
      </Container>
    </section>
  );
};

export default CategoriesPage;
