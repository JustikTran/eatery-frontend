import React from "react";
import { Row, Col, Card, Button, Typography, Space } from "antd";
import { EnvironmentOutlined, FieldTimeOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Location = () => {
    return (
        <div style={{ padding: "40px 20px" }}>
            <p className="font-bold text-2xl text-center p-6 text-[#341C11]">Location</p>
            <Row gutter={[16, 16]} justify="center" align="middle">
                <Col xs={24} md={10}>
                    <Card bordered={false} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                        <Space direction="vertical" size="middle">
                            <Title level={3}>Chuong Thu Eatery</Title>
                            <Text strong><EnvironmentOutlined /> Address:</Text>
                            <Text>Truong An Market, Long Chau ward, Vinh Long province.</Text>
                            <Text strong><PhoneOutlined /> Hotline:</Text>
                            <Text>
                                <a href="tel:0123456789" className="!text-black hover:underline">+8412 345 67 89</a>
                            </Text>
                            <Text strong><FieldTimeOutlined /> Time line:</Text>
                            <Text>17:00 - 22:00 everyday</Text>
                            <Button
                                type="primary"
                                href="https://www.google.com/maps/dir/?api=1&destination=10.264277514168981,105.93305415061008
"
                                target="_blank"
                            >
                                See directions
                            </Button>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} md={10}>
                    <div style={{ width: "100%", height: "300px" }}>
                        <iframe
                            title="Bản đồ – Phường Trường An, Vĩnh Long"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.3729103914571!2d105.93305415061008!3d10.264277514168981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a83007b62db1f%3A0xf44bce9ea969e5b4!2zSOG7pyB0aeG6v3UgYsOyIGtobywgcGjhu58sIGLDum4gYsOyLCBs4bqpdSBiw7IgVGh1IENoxrDGoW5n!5e0!3m2!1svi!2s!4v1756818287315!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Location;
