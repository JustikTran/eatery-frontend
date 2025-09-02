"use client";

import UserHeader from "@/components/common/header";
import UserFooter from "@/components/common/userFooter";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

const PageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Layout className="!min-h-screen">
            <Header className="!bg-[#F7F0E2] shadow sticky !px-20">
                <UserHeader />
            </Header>
            <Content className="px-20 py-4">
                <main>{children}</main>
            </Content>
            <Footer className="!bg-[#F7F0E2] !px-20">
                <UserFooter />
            </Footer>
        </Layout>
    );
};

export default PageLayout;