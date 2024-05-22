import { Fragment, useEffect } from "react";

import { Button, Flex, Image, Pagination, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { USERS } from "../../../redux/types";
import getUsers, { changeState } from "../../../redux/actions/users";
import { BASE } from "../../../consts";
import request from "../../../server/request";

const Users = () => {
  const { loading, total, page, users, refetch, btnLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, page, refetch]);
  
  const refresh = () =>{
    dispatch(changeState({refetch: !refetch}))
  }
  const deletetUser = async(id) => {
    const checkDelete = window.confirm("Do you want delete this user ?")
    if(checkDelete){
      try{
        dispatch(changeState({btnLoading: true}))
      await request.delete(`user/${id}`)
      refresh()
      }finally{
        dispatch(changeState({btnLoading: false}))
      }
    }
  };

  const editUser = (id) => {
    console.log(id);
  };

  const handlePage = (p) =>{
    dispatch({type: USERS, payload: {page: p}})
  } 

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <Image width={50} height={50} src={`${BASE}/upload/${photo}`} />
    },
    {
      title: "FirstName",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "LastName",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (_id) => (
        <Flex gap={"small"}>
          <Button onClick={() => editUser(_id)} type="primary">
            Edit
          </Button>
          <Button disabled={btnLoading} onClick={() => deletetUser(_id)} danger type="primary">
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        title={() => (
          <Flex align="center" justify="space-between">
            <h1>Users quantity: {total}</h1>
            <Button type="dashed">Add user</Button>
          </Flex>
        )}
        columns={columns}
        dataSource={users}
        pagination={false}
        loading={loading}
      />
      <Pagination defaultCurrent={1} total={total} onChange={handlePage} />
    </Fragment>
  );
};

export default Users;
