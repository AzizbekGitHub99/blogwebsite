import { useEffect, useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  UserOutlined,
  HomeOutlined,
  AreaChartOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

import "./style.scss"


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [params, setParams] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    setParams(pathname);
  }, [pathname]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={params}
          items={[
            {
              key: "1",
              icon: <HomeOutlined style={{fontSize: "24px"}} />,
              label: <Link to={"/"}>Home</Link>,
            },
            {
              key: "/admin/dashboard",
              icon: <AreaChartOutlined style={{fontSize: "24px"}}/>,
              label: <Link to={"/admin/dashboard"}>Dashboard</Link>,
            },
            {
              key: "/admin/categories",
              icon: <ProductOutlined style={{fontSize: "24px"}}/>,
              label: <Link to={"/admin/categories"}>Categories</Link>,
            },
            {
              key: "/admin/posts",
              icon: <MessageOutlined style={{fontSize: "24px"}}/>,
              label: <Link to={"/admin/posts"}>Posts</Link>,
            },
            {
              key: "/admin/users",
              icon: <UserOutlined style={{fontSize: "24px"}}/>,
              label: <Link to={"/admin/users"}>Users</Link>,
            },
            {
              key: "/admin/account",
              icon: <UserOutlined style={{fontSize: "24px"}}/>,
              label: <Link to={"/admin/account"}>Account</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
