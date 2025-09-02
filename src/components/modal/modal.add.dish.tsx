import LoadingItem from '@/components/loading/loadingItem';
import { sendRequest, sendRequestFile } from '@/utils/api';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useContext, useState } from 'react'

interface IData {
    onClose: () => void,
    onReload: () => void
}

interface ICreateResponse {
    statusCode: number;
    message: string;
    data?: string | null;
    imageUrl: string;
}

const ModalAddDish = ({ onClose, onReload }: IData) => {
    // const { accessToken } = useContext() ?? {};
    const [loading, setLoading] = useState<boolean>(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [form] = Form.useForm();

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith("image/");
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isImage) {
            message.error("Chỉ hỗ trợ hình ảnh!");
        }
        if (!isLt2M) {
            message.error("Hình ảnh phải có độ lớn dưới 2MB!");
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
                    // headers: { Authorization: `Bearer ${accessToken}` },
                    body: uploadImageForm,
                });
                if (thumbnailUploadRes.statusCode === 201) {
                    imageUrl = thumbnailUploadRes.imageUrl ?? "";
                }
            }
            return imageUrl;
        } catch {
            message.error("Thêm ảnh thất bại!")
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
                Name: formData?.Name,
                Description: formData?.Description,
                Price: formData?.Price,
                Image: thumbnailUri
            }
            const res = await sendRequest<IResponse>({
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/dish`,
                method: "POST",
                // headers: { Authorization: `Bearer ${accessToken}` },
                body: payload,
            })
            if (res.statusCode == 201) {
                message.success('Thêm món ăn mới thành công.');

                onReload();
                onClose();
            }
            else {
                message.info(res.message);
            }
        } catch {
            message.error('Thêm món ăn mới không thành công.');
        } finally {
            setLoading(false);
        }
    }

    if (loading)
        return (
            <LoadingItem notifyLoading='Đang thêm món ăn mới...' />
        )

    return (
        <Form
            layout='horizontal'
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: 800, display: 'flex', flexDirection: 'column' }}
            clearOnDestroy={true}
            onFinish={() => OnFinishForm()}
        >
            <div className='my-4' >
                <Form.Item label='Tên món' name={"Name"} rules={[{ required: true, message: "Tên món ăn không được để trống." }]}>
                    <Input maxLength={50} />
                </Form.Item>
                <Form.Item label='Mô tả' name={"Description"} rules={[{ required: true, message: "Mô tả món ăn không được để trống." }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Ảnh minh họa">
                    <Upload
                        listType="picture"
                        beforeUpload={beforeUpload}
                        onChange={(e) => handleFileChange(e, setThumbnail)}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload image(Max: 1)</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Giá (VNĐ)" name={"Price"} rules={[
                    { required: true, message: 'Vui lòng nhập giá sản phẩm' },
                    { type: 'number', min: 10000, max: 1000000, message: 'Giá phải từ 10,000 đến 1,000,000.' },
                ]} >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </div>

            <Button className='items-end' type="default" htmlType='submit'>
                Thêm món
            </Button>
        </Form>
    )
}

export default ModalAddDish