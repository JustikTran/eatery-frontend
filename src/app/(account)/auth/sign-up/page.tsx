"use client";

import LoadingItem from '@/components/loading/loadingItem';
import { sendRequest } from '@/utils/api';
import { Button, Card, Form, Input, Divider, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();

    const checkUnique = async (field: string, value: string) => {
        if (!value) return Promise.resolve();
        try {
            const res = await sendRequest<IResponse<IAccount>>({
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/account/${field}=${value}`,
                method: "GET",
            });
            if (res.statusCode != 404) {
                return Promise.reject(`${field} đã được sử dụng`);
            }
            return Promise.resolve();
        } catch {
            return Promise.reject("Không kiểm tra được, vui lòng thử lại");
        }
    };

    const onFinish = async () => {
        try {
            setLoading(true);

            const formdata = form.getFieldsValue();
            const payload = {
                Username: formdata.username,
                Password: formdata.password,
                Email: formdata.email,
                PhoneNumber: formdata.phoneNumber,
                Role: "USER",
                IsActived: false,
                IsBanned: false,
                IsDeleted: false
            }
            const res = await sendRequest<IResponse<{ username: string }>>({
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/sign-up`,
                method: "POST",
                body: payload
            })

            if (res.statusCode == 201) {
                notification.success({
                    message: "Registration successful.",
                    description: "Sign up new account successfully.",
                    duration: 3,
                });
                router.push(`/create-user/${res.data?.username}`);
                // redirect(`/create-user/${res.data?.Id}`);
                // redirect(`/verify/${res.data?.Id}`)
            }

        } catch {
            notification.error({
                message: "Registration fail.",
                description: "Sign up new account fail.",
                duration: 3,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center flex-col justify-center min-h-screen bg-[#F7F0E2]'>
            {
                loading ? <Card
                    className='m-auto w-[30vw] shadow-2xl'>
                    <LoadingItem notifyLoading='Registering...' />
                </Card> : <Card
                    className='m-auto w-[30vw] shadow-2xl'>
                    <p className=' text-center mb-10 text-2xl font-black text-[#341c11]'>Sign Up</p>
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
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: 'Please input your username!' },
                                {
                                    validator: (_, value) => checkUnique("username", value),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve(); // đã có required check ở trên
                                        if (value.length < 8) {
                                            return Promise.reject(new Error('Password must be at least 8 characters!'));
                                        }
                                        if (!/[0-9]/.test(value)) {
                                            return Promise.reject(new Error('Password must contain at least 1 digit!'));
                                        }
                                        if (!/[!@#$%^&*]/.test(value)) {
                                            return Promise.reject(new Error('Password must contain at least 1 special character!'));
                                        }
                                        return Promise.resolve();
                                    },
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirm"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'The input is not a valid email!' },
                                {
                                    validator: (_, value) => checkUnique("email", value),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone number"
                            name="phoneNumber"
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                {
                                    pattern: /^[0-9]{9,11}$/,
                                    message: 'Phone number must be 9–11 digits!',
                                },
                                {
                                    validator: (_, value) => checkUnique("phone", value),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Button
                            className='!bg-[#341c11] hover:shadow hover:bg-[#341c1180]'
                            type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                    <Divider />
                    <p className='text-center mt-10'>Already have account? <Link className='text-[#341c11] font-bold hover:underline hover:text-[#341c11]' href={'/auth/sign-in'}>Sign In</Link></p>
                </Card>
            }
        </div>
    )
}

export default SignUpPage