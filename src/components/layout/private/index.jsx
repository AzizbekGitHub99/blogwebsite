import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import "./style.scss"

const { Header, Sider, Content } = Layout;

const PrivateLayout = () => {
  const [ collapsed, setCollapsed ] = useState( false );
  const [ key, setKey ] = useState( '/admin/dashboard' )
  const { pathname } = useLocation()

  useEffect( () => {
    setKey( pathname )
  }, [ pathname ] )

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="admin-logo">
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[ key ]}
          items={[
            {
              key: '/admin/dashboard',
              icon: <VideoCameraOutlined />,
              label: <Link to='/admin/dashboard'>Dashboard</Link>,
            },
            {
              key: '/admin/teachers',
              icon: <UserOutlined />,
              label: <Link to='/admin/teachers'>Teachers</Link>,
            },
            {
              key: '/admin/students',
              icon: <UploadOutlined />,
              label: <Link to='/admin/students'>Students</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            borderBottom: '1px solid black',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed( !collapsed )}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
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
export default PrivateLayout;