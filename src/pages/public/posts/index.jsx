import { Fragment, useEffect, useState } from "react";
import PostCard from "../../../components/card/post";
import Container from "../../../components/container";
import ReactPaginate from "react-paginate";

import request from "../../../server/request";

import "./style.scss";
import { LIMIT } from "../../../consts";
import { Flex, Spin } from "antd";

const PostsPage = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const params = { page: page + 1, limit: LIMIT, search };
        setLoading(true);
        const {
          data: {
            data,
            pagination: { total },
          },
        } = await request("post", { params });
        console.log(data, total);
        setPages(total);
        setData(data);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [page, search]);

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const handleValue = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const pagination = (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageCount={Math.ceil(pages / LIMIT)}
      previousLabel="< Prev"
      renderOnZeroPageCount={null}
      forcePage={page}
      className="pagination"
      pageClassName="pagination__page"
      activeLinkClassName="pagination__active-link"
      previousClassName="pagination__prev"
      nextClassName="pagination__next"
      disabledClassName="pagination__disabled"
    />
  );

  return (
    <section className="posts">
      <Container>
        <div className="posts__container">
          <input
            type="text"
            placeholder="Searching ..."
            className="posts__search"
            onChange={handleValue}
          />
          <h1 className="posts__title">All posts</h1>
          <span className="posts__line"></span>

          {loading ? (
            <Flex align="center" justify="center" style={{marginTop: "10px"}} gap="middle">
              <Spin size="large" />
            </Flex>
          ) : (
            <Fragment>
              <div className="posts__content">
                {data?.map((el) => (
                  <PostCard key={el._id} {...el} />
                ))}
              </div>
              <div>{pagination}</div>
            </Fragment>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PostsPage;
