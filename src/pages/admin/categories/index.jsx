import { Fragment, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { changeState, getCategories } from "../../../redux/actions/categories";
import imgURL from "../../../utils/getImgUrl";
import request from "../../../server/request";

const AdminCategories = () => {
  const {
    categories,
    loading,
    total,
    page,
    isOpen,
    btnLoading,
    photo,
    refetch,
    selected,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, page, refetch]);

  const showModal = () => {
    dispatch(changeState({ isOpen: true }));
    dispatch(changeState({ photo: null }));
    dispatch(changeState({ selected: null }));
    form.resetFields();
  };

  const handlePage = (p) => {
    dispatch(changeState({ page: p }));
  };

  const handleCancel = () => {
    dispatch(changeState({ isOpen: false }));
  };
  const refreshFetch = () => {
    dispatch(changeState({ refetch: !refetch }));
  };

  const submit = async () => {
    try {
      dispatch(changeState({ btnLoading: true }));
      const values = await form.validateFields();
      const data = { ...values, photo: photo._id };
      if (selected === null) {
        await request.post("category", data);
      } else {
        await request.put(`category/${selected}`, data);
      }
      dispatch(changeState({ isOpen: false }));
      refreshFetch();
    } finally {
      dispatch(changeState({ btnLoading: false }));
    }
  };

  // photo
  const handlePhoto = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      dispatch(changeState({ btnLoading: true }));
      const { data } = await request.post("upload", formData);
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

  const editCategory = async (id) => {
    const { data } = await request(`category/${id}`);
    dispatch(changeState({ selected: id, photo: data.photo, isOpen: true }));
    form.setFieldsValue(data);
  };

  const deleteCategory = async (id) => {
    const checkDelete = window.confirm("Do you want delete this category ?");
    try {
      if (checkDelete) {
        dispatch(changeState({ btnLoading: true }));
        await request.delete(`category/${id}`);
        refreshFetch();
      }
    } finally {
      dispatch(changeState({ btnLoading: false }));
    }
  };

  
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo, record) => (
        <Image width={50} height={50} src={imgURL(photo)} alt={record.name} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (_id) => (
        <Flex gap={"small"}>
          <Button onClick={() => editCategory(_id)} type="primary">
            Edit
          </Button>
          <Button onClick={() => deleteCategory(_id)} type="primary" danger>
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
            <h1>Categories ({total})</h1>
            <Button onClick={showModal} type="dashed">
              {" "}
              Add Category
            </Button>
          </Flex>
        )}
        columns={columns}
        dataSource={categories}
        pagination={false}
        loading={loading}
      />
      {total >= 10 ? (
        <Pagination defaultCurrent={page} total={total} onChange={handlePage} />
      ) : null}
      <Modal
        title="Category data"
        open={isOpen}
        onOk={submit}
        confirmLoading={btnLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="category"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
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

export default AdminCategories;
