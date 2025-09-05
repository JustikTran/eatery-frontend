"use client";

import { Button, Card, Input, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react'

interface OtpVerifyCardProps {
    hideEmail: string,
    onVerify: (otp: string) => void;
    onResend: () => void;
}

const CardVerify = ({ hideEmail, onVerify, onResend }: OtpVerifyCardProps) => {
    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [countdown]);



    const handleResend = () => {
        setCountdown(60); // 60s mới cho gửi lại
        onResend();
    };

    return (
        <div className='flex items-center flex-col justify-center min-h-screen bg-[#F7F0E2]'>
            {
                <Card
                    className='m-auto w-[30vw] shadow-2xl'
                    title="Verify OTP"
                    style={{
                        maxWidth: 400,
                        margin: "50px auto",
                        textAlign: "center",
                        borderRadius: 16,
                    }}
                >
                    <Typography.Paragraph>
                        {
                            `Please enter the OTP code sent to your email ${hideEmail}`
                        }

                    </Typography.Paragraph>

                    <Input.OTP
                        length={6}
                        value={otp}
                        onChange={(val) => {
                            const onlyDigits = val.replace(/\D/g, "");
                            setOtp(onlyDigits)
                        }}
                        style={{ marginBottom: 16, justifyContent: "center" }}
                    />

                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Button
                            type="primary"
                            block
                            onClick={() => onVerify(otp)}
                            disabled={otp.length !== 6}
                        >
                            Xác minh
                        </Button>
                        <Button
                            type="link"
                            onClick={handleResend}
                            disabled={countdown > 0}
                        >
                            {countdown > 0
                                ? `Re-send OTP after ${countdown}s`
                                : "Re-send OTP"}
                        </Button>
                    </Space>
                </Card>
            }
        </div>
    )
}

export default CardVerify