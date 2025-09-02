"use client";

import AdminMenu from "@/components/common/adminMenu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="!min-h-screen">
      <Sider
        className="pt-20"
        trigger={null}
        collapsible collapsed={collapsed}>
        <AdminMenu />
      </Sider>
      <Layout>
        <Header
          className="border-b border-gray-200 shadow-sm"
          style={{
            padding: 0,
            background: "transparent",
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content >
          <main>{children}</main>
        </Content>
        <Footer >Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;