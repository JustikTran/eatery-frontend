"use client";

import LoadingItem from '@/components/loading/loadingItem';
import { useAuth } from '@/context/AuthContext';
import { Button, Card, Form, Input, Divider, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'



const SignInPage = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async () => {
        try {
            setLoading(true);

            const formdata = form.getFieldsValue();
            const res = await login(formdata.username, formdata.password);
            if (res.ok) {
                router.push("/home");
            } else {
                message.error(res.message);
            }
        } catch {
            message.error("Lỗi không xác định khi thực hiện đăng nhập.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center flex-col justify-center min-h-screen bg-[#F7F0E2]'>
            {
                loading ? <Card
                    className='m-auto w-[30vw] shadow-2xl'>
                    <LoadingItem notifyLoading='Login...' />
                </Card> : <Card
                    className='m-auto w-[30vw] shadow-2xl'>
                    <p className=' text-center mb-10 text-2xl font-black text-[#341c11]'>Sign In</p>
                    <Form
                        name="basic"
                        layout='horizontal'
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                        style={{ maxWidth: 600, display: 'flex', flexDirection: 'column' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        requiredMark={false}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Button
                            className='!bg-[#341c11] hover:shadow hover:bg-[#341c1180]'
                            type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                    <Divider />
                    <p className='text-center mt-10'>Do not have account? <Link className='text-[#341c11] font-bold hover:underline hover:text-[#341c11]' href={'/auth/sign-up'}>Sign up</Link></p>
                </Card>
            }
        </div>
    )
}

export default SignInPage