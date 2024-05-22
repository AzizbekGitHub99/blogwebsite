import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";

import { changeState, getPosts } from "../../../redux/actions/post";
import { POSTS } from "../../../redux/types";
import imgURL from "../../../utils/getImgUrl";
import { getCategories } from "../../../redux/actions/categories";
import request from "../../../server/request";

const AdminPosts = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    posts,
    loading,
    total,
    page,
    btnLoading,
    photo,
    refetch,
    isOpen,
    selected,
  } = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, page, refetch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, page, refetch]);

  const refreshFetch = () => {
    dispatch(changeState({ refetch: !refetch }));
  };

  const handlePage = (page) => {
    dispatch({ type: POSTS, payload: { page } });
  };

  const submit = async () => {
    try {
      dispatch(changeState({ btnLoading: true }));
      const values = await form.validateFields();
      const tags = values.tags.split(",");
      const data = { ...values, tags, photo: photo._id };
      if (selected === null) {
        await request.post("post", data);
      } else {
        await request.put(`post/${selected}`, data);
      }
      dispatch(changeState({ isOpen: false }));
      refreshFetch();
    } finally {
      dispatch(changeState({ btnLoading: false }));
    }
  };

  const handleCancel = () => {
    dispatch(changeState({ isOpen: false }));
  };

  const showModal = () => {
    dispatch(changeState({ isOpen: true }));
    dispatch(changeState({ photo: null }));
    form.resetFields();
  };

  const handlePhoto = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      dispatch(changeState({ btnLoading: true }));
      const { data } = await request.post("/upload", formData);
      dispatch(changeState({ photo: data }));
    } finally {
      dispatch(changeState({ btnLoading: false }));
    }
  };

  const deletePhoto = async () => {
    try {
      dispatch(changeState({ btnLoading: true }));
      await request.delete(`upload/${photo._id}`);
      dispatch(changeState({ photo: null }));
    } finally {
      dispatch(changeState({ btnLoading: false }));
    }
  };

  const editPost = async (id) => {
    dispatch(changeState({ selected: id }));
    dispatch(changeState({ isOpen: true }));
    const { data: data } = await request.get(`post/${id}`);
    const value = { ...data, category: data.category._id };
    form.setFieldsValue(value);
    dispatch(changeState({ photo: data.photo }));
  };

  const deletePost = async (id) => {
    const checkDelete = window.confirm("Do you want delete this post ?");
    if (checkDelete) {
      await request.delete(`post/${id}`);
      refreshFetch();
    }
  };
  const onShowSizeChange = (page, total) => {
    console.log(page, total);
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <Image width={50} height={50} src={imgURL(photo)} />,
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "description",
      render: (category) => category.name,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (_id) => (
        <Flex gap={"small"}>
          <Button onClick={() => editPost(_id)} type="primary">
            Edit
          </Button>
          <Button onClick={() => deletePost(_id)} danger type="primary">
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
          <Flex justify="space-between" align="center">
            <h1>Posts quantity: {total}</h1>
            <Button onClick={showModal} type="dashed">
              Add Post
            </Button>
          </Flex>
        )}
        columns={columns}
        dataSource={posts}
        pagination={false}
        loading={loading}
      />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={page}
        total={total}
        onChange={handlePage}
        
      />
      <Modal
        title="Category data"
        open={isOpen}
        onOk={submit}
        confirmLoading={btnLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="post"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Select>
              {categories.map((el) => (
                <Select.Option key={el._id} value={el._id}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {photo ? (
            <Flex vertical="column" gap={"small"}>
              <Image src={imgURL(photo)} />
              <Button
                loading={btnLoading}
                onClick={deletePhoto}
                type="primary"
                danger
              >
                Delete photo
              </Button>
            </Flex>
          ) : (
            <input
              disabled={btnLoading}
              type="file"
              accept="image/jpeg, image/png, image/JPG"
              onChange={handlePhoto}
            />
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AdminPosts;
