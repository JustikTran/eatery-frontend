"use client";

import LoadingPage from '@/components/loading/loadingPage';
import { sendRequest } from '@/utils/api';
import { Card, Descriptions, Tag, Image, message, Row, Col } from 'antd';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DishDetailManagePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [dish, setDish] = useState<IDish | null>(null);

  useEffect(() => {
    const getDish = async () => {
      try {
        setLoading(true);
        const res = await sendRequest<IResponse<IDish>>({
          url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/dish/id=${id}`,
          method: "GET",
          // headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.statusCode == 200)
          setDish(res.data ?? null);
        else {
          message.error("Lấy dữ liệu món ăn không thành công.");
        }
      } catch {
        message.error('Lấy dữ liệu món ăn không thành công.');
      }
      finally {
        setLoading(false);
      }
    }
    getDish();
  }, [id]);

  if (loading)
    return (
      <LoadingPage message='Đang tải thông tin món ăn...' />
    )

  return (
    <div className='p-4'>
      <Card
        title={dish?.Name}
        bordered
        style={{ width: "100%" }}
      >
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Image
              src={dish?.Image}
              alt={dish?.Name}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
          <Col span={16}>
            <Descriptions column={1} size="middle">
              <Descriptions.Item label="Mô tả">
                {dish?.Description}
              </Descriptions.Item>
              <Descriptions.Item label="Giá">
                {dish?.Price?.toLocaleString()} VNĐ
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={!dish?.IsDeleted ? "green" : "red"}>
                  {!dish?.IsDeleted ? "Đang bán" : "Ngừng bán"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default DishDetailManagePage