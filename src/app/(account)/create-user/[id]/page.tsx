"use client";

import LoadingItem from '@/components/loading/loadingItem';
import { sendRequest, sendRequestFile } from '@/utils/api';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, message, Select, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";

interface ICreateResponse {
  statusCode: number;
  message: string;
  data?: string | null;
  imageUrl: string;
}

const CreateUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [form] = Form.useForm();
  const param = useParams();
  const [account, setAccount] = useState<IAccount | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getAccount = async () => {
      const res = await sendRequest<IResponse<IAccount>>({
        url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/account/username=${param.id}`,
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
      })
      setAccount(res.data ?? null);
    }
    getAccount();
  }, [param]);

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isImage) {
      message.error("Only images supported!");
    }
    if (!isLt2M) {
      message.error("Images must be under 2MB in size!");
    }
    return isImage && isLt2M;
  };

  // start Upload file
  const UploadFile = async (file: File) => {
    try {
      let imageUrl = "";
      if (file) {
        const uploadImageForm = new FormData();
        uploadImageForm.append("file", file);
        uploadImageForm.append("folder", "thumbnails");
        const thumbnailUploadRes = await sendRequestFile<ICreateResponse>({
          url: `${process.env.NEXT_PUBLIC_API_BACKEND}/upload-image`,
          method: "POST",
          // headers: { Authorization: `Bearer ${token}` },
          body: uploadImageForm,
        });
        if (thumbnailUploadRes.statusCode === 201) {
          imageUrl = thumbnailUploadRes.imageUrl ?? "";
        }
      }
      return imageUrl;
    } catch {
      message.error("Upload image fail!")
    }
  }

  const handleFileChange = (
    e: UploadChangeParam<UploadFile>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.file.originFileObj;
    if (file) setFile(file);
  };

  const OnFinishForm = async () => {
    try {
      setLoading(true);
      const formData = form.getFieldsValue();
      const thumbnailUri = thumbnail ? await UploadFile(thumbnail) : null;
      const payload = {
        AccountId: account?.Id,
        FirstName: formData?.firstName,
        LastName: formData?.lastName,
        Language: formData?.language,
        DateOfBirth: formData?.birthDate
          ? dayjs(formData.birthDate).format("YYYY-MM-DD")
          : null,
        Avatar: thumbnailUri,
        IsDeleted: false
      }
      console.log(payload);

      const res = await sendRequest<IResponse<IUser>>({
        url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/user`,
        method: "POST",
        // headers: { Authorization: `Bearer ${token}` },
        body: payload,
      })
      if (res.statusCode == 201) {
        message.success('Create user profile successful.');
        // redirect('auth/sign-in');
        router.push('/auth/sign-in');
      }
      else {
        message.info(res.message);
      }
    } catch {
      message.error('Create user profile failure.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex items-center flex-col justify-center min-h-screen bg-[#F7F0E2]'>
      {
        loading ? <Card
          className='m-auto w-[30vw] shadow-2xl'>
          <LoadingItem notifyLoading='Creating profile...' />
        </Card> : <Card
          className='m-auto w-[30vw] shadow-2xl'>
          <p className=' text-center mb-10 text-2xl font-black text-[#341c11]'>Create user profile</p>
          <Form
            name="basic"
            layout='horizontal'
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: 600, display: 'flex', flexDirection: 'column' }}
            initialValues={{ language: 'en' }}
            onFinish={OnFinishForm}
            requiredMark={false}
            autoComplete="off"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' },
              { min: 2, message: 'First name must be at least 2 characters!' },
              { max: 20, message: 'First name cannot exceed 20 characters!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' },
              { min: 2, message: 'Last name must be at least 2 characters!' },
              { max: 20, message: 'Last name cannot exceed 20 characters!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Avatar">
              <Upload
                className='w-full'
                listType="picture"
                beforeUpload={beforeUpload}
                onChange={(e) => handleFileChange(e, setThumbnail)}
                maxCount={1}
              >
                <Button className='w-full' icon={<UploadOutlined />}>Upload image(Max: 1)</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Birth Date"
              name="birthDate"
              rules={[{ required: true, message: 'Please input your birth date!' },
              ]}
            >
              <DatePicker
                className='w-full'
                format={{
                  format: 'DD-MM-YYYY',
                  type: 'mask',
                }}
              // onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: 'Please choose language!' },
              ]}
            >
              <Select
                defaultValue="en"
                style={{ width: 120 }}
                allowClear
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'vn', label: 'Vietnamese' }
                ]}
                placeholder="select it"
              />
            </Form.Item>

            <Button
              className='!bg-[#341c11] hover:shadow hover:bg-[#341c1180]'
              type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Card>
      }
    </div>
  )
}

export default CreateUserPage