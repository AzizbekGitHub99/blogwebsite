import { Fragment, useEffect, useState } from "react";
import { Button, Col, Flex, Form, Image, Input, Row, Tabs } from "antd";
import { toast } from "react-toastify";

import request from "../../server/request";
import { BASE } from "../../consts";

const Account = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false)
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await request("auth/me");
      setUser(data);
    };
    getUser();
  }, [callback]);

  const refetch = () =>{
    setCallback(!callback)
  }

  form.setFieldsValue(user);
  const onFinish = async(values) => {
    try{
        setBtnLoading(true)
        await request.put('auth/details', values)
        refetch()
    }finally{
        setBtnLoading(false)
    }
  };

  const onFinishPassword = async (values) => {
    try{
        setBtnLoading(true)
        await request.put('auth/password', values)
        form.resetFields()
        toast.success('Password changed successfully')
    }finally{
        setBtnLoading(false)
    }
  };

  

  const deletePhoto = async() =>{
    const checkDelete = window.confirm()
    if(checkDelete){
        await request.delete(`auth/upload/${user?.photo}`)
        refetch()
    }
  }

  const handlePhoto = async(e) =>{
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    await request.post('auth/upload', formData)
    refetch()
  }

  const items = [
    {
      key: "1",
      label: "User Info",
      children: (
        <Row>
          <Col span={8}>
            <Flex vertical="column" gap={10} align="start">
                {user?.photo ? 
                <Fragment>
                <Button  onClick={deletePhoto} danger type="dashed">Delete Photo</Button>
                <Image width="90%" src={`${BASE}upload/${user?.photo}`} />
                </Fragment> :
                 <input className="file-btn" type="file" onChange={handlePhoto} /> }
            </Flex>
          </Col>
          <Col span={16}>
            <Form
            
              form={form}
              name="user"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item
                label="FirstName"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please fill !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="LastName"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please fill !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please fill !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button loading={btnLoading} style={{ width: "50%" }} type="primary" htmlType="submit">
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Update password",
      children: (
        <Flex justify="center">
          <Form
            form={form}
            name="password"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            autoComplete="off"
            onFinish={onFinishPassword}
          >
            <Form.Item
              label="CurrentPassword"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please fill !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please fill !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button loading={btnLoading} style={{ width: "50%" }} type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        </Flex>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Account;
