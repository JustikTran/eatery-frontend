"use client";

import LoadingPage from '@/components/loading/loadingPage';
import ModalAddDish from '@/components/modal/modal.add.dish';
import { sendRequest } from '@/utils/api';
import { EditOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Image, message, Modal, Popconfirm, Space, Table, TableColumnsType, Tag } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const DishManagePage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dishes, setDishes] = useState<IDish[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const columns: TableColumnsType<IDish> = [
        {
            title: 'Tên món ăn',
            dataIndex: 'Name',
            key: 'name',
            render: (name: string, record: IDish) => (
                <Link
                    href={`/dashboard/dish/${record.Id}`}
                    className="text-black cursor-pointer hover:underline hover:text-black">
                    {name}
                </Link>
            )
        },

        {
            title: 'Ảnh minh họa',
            dataIndex: 'Image',
            key: 'image',
            render: (imageUri: string) => (
                <Image height={'60px'} alt='product image' src={imageUri} />
            )
        },
        {
            title: 'Giá (VNĐ)',
            dataIndex: 'Price',
            key: 'price',
            render: (price: number) => price.toLocaleString(),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'InStock',
            key: 'inStock',
            render: (inStock: boolean) =>
                inStock ? (
                    <Tag color="green">Đang bán</Tag>
                ) : (
                    <Tag color="red">Hết món</Tag>
                ),
        },
        {
            title: '',
            key: 'action',
            render: (_: unknown, record: IDish) => (
                !record.IsDeleted && <Space>
                    <div>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => alert(`Sửa: ${record.Name}`)}
                        >
                            Sửa
                        </Button>
                    </div>

                    <Popconfirm
                        title="Xóa món ăn"
                        description="Xác nhận muốn xóa món ăn?"
                        cancelText="Hủy"
                        okText="Xác nhận"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDelete(record.Id)}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ]

    const getDishes = async () => {
        try {
            const res = await sendRequest<IOdataResponse<IDish>>({
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/dish`,
                method: "GET",
                // headers: { Authorization: `Bearer ${accessToken}` }
            })

            setDishes(res.value ?? []);
        } catch {
            message.error("Lỗi máy chủ. Không thể thực hiện lấy dữ liệu món ăn.");
        }
    }

    const handleDelete = async (dishId: string) => {
        try {
            setLoading(true);
            const res = await sendRequest<IResponse>({
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/dish/id=${dishId}`,
                method: "DELETE",
                // headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (res.statusCode == 200) {
                message.success("Xóa món ăn thành công.");
                await getDishes();
            } else {
                message.error("Xóa món ăn thất bại.");
            }
        } catch {
            message.error("Xóa món ăn thất bại.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getDishes();
        setLoading(false);
    }, []);

    if (loading)
        return (
            <LoadingPage message='Đang tải dữ liệu món ăn...' />
        );

    return (
        <div className='p-4'>
            <h1 className="text-xl font-bold mb-4">Danh sách món ăn</h1>
            <Button onClick={() => setShowModal(true)}>
                <PlusOutlined />
                <span>Thêm món mới</span>
            </Button>
            <Table
                style={{ marginTop: 8, backgroundColor: 'transparent' }}
                columns={columns}
                dataSource={dishes}
            // pagination={{
            //     current: skip / top + 1,
            //     total: total,
            //     pageSize: top,
            //     defaultCurrent: defaultCurrent,
            //     onChange: async (page, pageSize) => {
            //         const newSkip = (page - 1) * pageSize;
            //         setSkip(newSkip);
            //         await getProducts(newSkip, top);
            //     },
            // }}
            />
            <Modal
                title={"Thêm món ăn mới"}
                footer={null}
                centered
                onCancel={() => setShowModal(false)}
                destroyOnClose={true}
                visible={showModal}>
                <ModalAddDish
                    onReload={() => getDishes()}
                    onClose={() => setShowModal(false)} />
            </Modal>
        </div>
    )
}

export default DishManagePage