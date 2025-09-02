"use client";

import React from "react";
import { Menu } from "antd";
import {
    AppstoreOutlined,
    CoffeeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    OrderedListOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        key: "/dashboard",
        icon: <AppstoreOutlined />,
        label: <Link href={'/dashboard'}>Tổng quan</Link>,
    },
    {
        key: "/dashboard/dish",
        icon: <CoffeeOutlined />,
        label: <Link href={'/dashboard/dish'}>Quản lý món ăn</Link>,
    },
    {
        key: "/dashboard/topping",
        icon: <OrderedListOutlined />,
        label: <Link href={'/dashboard/topping'}>Quản lý món phụ</Link>,
    },
    {
        key: "/dashboard/topping",
        icon: <UserOutlined />,
        label: <Link href={'dashboard/topping'}>Quản lý người dùng</Link>,
    },
    {
        key: "/dashboard/order",
        icon: <ShoppingCartOutlined />,
        label: <Link href={'/dashboard/order'}>Quản lý đơn hàng</Link>,
    },
    {
        key: "/dashboard/payment",
        icon: <DollarOutlined />,
        label: <Link href={'/dashboard/payment'}>Quản lý thanh toán</Link>,
    },
];

const AdminMenu = () => {
    const pathName = usePathname();
    const matchedKeys = menuItems
        .map(item => item.key)
        .filter(key => pathName.startsWith(key));
    const matchedKey = matchedKeys.sort((a, b) => b.length - a.length)[0] ?? "";
    return (
        <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            selectedKeys={[matchedKey]}
        />
    );
};

export default AdminMenu;
