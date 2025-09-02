
import { Button, Menu, Space } from 'antd'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
const menuItems = [
    {
        key: "/home",
        label: <Link className='text-[#341C11]' href={'/home'}>Home</Link>,
        link: '/home'
    },
    {
        key: "/dish",
        label: <Link className='text-[#341C11]' href={'/dish'}>Dish</Link>,
        link: "/dish"
    },
    {
        key: "/about",
        label: <Link className='text-[#341C11]' href={'/about'}>About us</Link>,
        link: "/about"
    },
    {
        key: "/contact",
        label: <Link className='text-[#341C11]' href={'/contact'}>Contact us</Link>,
        link: "/contact"
    },
];
const UserHeader = () => {
    const pathName = usePathname();
    const matchedKeys = menuItems
        .map(item => item.key)
        .filter(key => pathName.startsWith(key));
    const matchedKey = matchedKeys.sort((a, b) => b.length - a.length)[0] ?? "";

    return (
        <div className='flex items-center'>
            <div className='flex items-center space-x-20 w-full user-menu'>
                <div className='logo w-16 h-16'></div>
                <Menu
                    className='!bg-transparent'
                    mode="horizontal"
                    items={menuItems}
                    selectedKeys={[matchedKey]}
                    style={{ flex: 1, minWidth: 1 }}
                />
            </div>
            <Space>
                <Button
                    className='!font-bold !bg-[#341C11] !border-[#341C11] !text-white hover:!bg-[#341C11d0] hover:!border-[#341C11]'
                >Sign In</Button>
                <Button
                    className='!font-bold hover:!bg-[#341C11d0] !border-[#341C11] hover:!text-white !bg-transparent hover:!border-[#341C11] !text-[#341C11]'
                >Sign Up</Button>
            </Space>
        </div>
    )
}

export default UserHeader