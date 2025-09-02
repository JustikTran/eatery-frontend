"use client";

import React from "react";
import { Card, Button, Row, Col } from "antd";
import Meta from "antd/es/card/Meta";

const bestSellers = [
    {
        id: 1,
        name: "Phở Đặc Biệt",
        price: 35000,
        image: "/image/pho.jpg",
    },
    {
        id: 2,
        name: "Bún Bò Huế",
        price: 25000,
        image: "/image/bun_bo_hue.jpg",
    },
    {
        id: 3,
        name: "Bò Kho",
        price: 25000,
        image: "/image/bo_kho.jpg",
    }
];

const BestSeller = () => {
    return (
        <div style={{ padding: "40px 0" }}>
            <h2 className="font-bold text-2xl text-center p-6 text-[#341C11]">
                Featured dishes
            </h2>
            <Row gutter={[16, 16]} justify="center">
                {bestSellers.map((item) => (
                    <Col xs={24} sm={12} md={8} key={item.id}>
                        <Card
                            hoverable
                            cover={
                                <div
                                    style={{
                                        width: "100%",
                                        height: 200, // ép chiều cao cố định
                                        overflow: "hidden",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        alt={item.name}
                                        src={item.image}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "cover", // giữ tỉ lệ, crop nếu cần
                                        }}
                                    />
                                </div>
                            }
                        >
                            <Meta
                                title={item.name}
                                description={`Giá: ${item.price.toLocaleString()} đ`}
                            />
                            <div style={{ marginTop: 12, textAlign: "center" }}>
                                <Button type="primary" style={{ marginRight: 8 }}>
                                    Đặt ngay
                                </Button>
                                <Button>Xem chi tiết</Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BestSeller;
