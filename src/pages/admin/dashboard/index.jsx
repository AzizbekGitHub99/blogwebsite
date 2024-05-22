import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/categories";
import { getPosts } from "../../../redux/actions/post";
import getUsers from "../../../redux/actions/users";
import { Col, Row, Statistic } from "antd";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.categories);
  const { total: totalPosts } = useSelector((state) => state.posts);
  const { total: totalUsers } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <Fragment>
      {/* <div>
        <h1>Total categories {total}</h1>
        <h1>Total posts {totalPosts}</h1>
        <h1>Total users {totalUsers}</h1>
      </div> */}
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title={<h2>Total Users: </h2>} value={totalUsers} />
        </Col>
        <Col span={8}>
          <Statistic
            title={<h2>Total posts: </h2>}
            value={totalPosts}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={<h2>Total Categories: </h2>}
            value={total}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
