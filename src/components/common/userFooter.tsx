import { FacebookOutlined, InstagramOutlined, TikTokOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'

const UserFooter = () => {
    return (
        <div className='flex items-start w-full justify-between'>
            <div className='flex flex-col w-1/5'>
                <div className='flex items-center '>
                    <div className='logo w-16 h-16'></div>
                    <h1 className='font-bold text-[#341C11] text-2xl'>Pho Chuong Thu</h1>
                </div>
                <p className='font-light text-sm'><span className='font-bold'>Address:</span> Truong An Market, Long Chau ward, Vinh Long province.</p>
                <p className='font-light text-sm'><span className='font-bold'>Phone number:</span> +8412 345 67 89</p>
            </div>
            <div>
                <p className='uppercase text-xs font-semibold'>Customer service</p>
                <ul className='mt-3'>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>Help Centre</Link>
                    </li>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>How To Buy</Link>
                    </li>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>Shipping</Link>
                    </li>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>Contact Us</Link>
                    </li>
                </ul>
            </div>
            <div>
                <p className='uppercase text-xs font-semibold'>About eatery</p>
                <ul className='mt-3'>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>About Us</Link>
                    </li>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>Privacy Policy</Link>
                    </li>
                </ul>
            </div>
            <div>
                <p className='uppercase text-xs font-semibold'>Follow Us</p>
                <ul className='mt-3'>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>
                            <FacebookOutlined />
                            <span className='ml-1'>Facebook</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>
                            <InstagramOutlined />
                            <span className='ml-1'>Instagram</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='text-[#341C11] hover:underline hover:text-[#341C11]' href=''>
                            <TikTokOutlined />
                            <span className='ml-1'>Tiktok</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserFooter