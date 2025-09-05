"use client";

import React, { useEffect, useState } from "react";

import { message, notification } from "antd";
import OtpVerifyCard from '@/components/verify/cardVerify';
import { useParams } from "next/navigation";
import { sendRequest } from "@/utils/api";

const VerifyOtpPage = () => {
    const param = useParams();
    const [loading, setLoading] = useState();
    const [hideMail, setHideMail] = useState<string>('');
    const [account, setAccount] = useState<IAccount | null>(null);

    const sendMail = async () => {
        await sendRequest<IResponse<object>>({
            url: `${process.env.NEXT_PUBLIC_API_BACKEND}/mail/send-verification-email`,
            method: "POST",
            body: {
                To: account?.Email,
                Name: account?.Username
            }
        });
    }

    useEffect(() => {
        const getAccount = async () => {
            try {
                const res = await sendRequest<IResponse<IAccount>>({
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/account/id=${param}`,
                    method: "GET",
                })

                if (res.statusCode == 200) {
                    setAccount(res.data!);
                    maskEmail(res.data!.Email)
                }
                else {
                    notification.error({
                        message: `${res.message}`,
                        duration: 3,
                    });
                }
            } catch {
                notification.error({
                    message: "Undefine error.",
                    duration: 3,
                });
            }
        }

        getAccount();
        sendMail();

    }, [param]);

    const handleVerify = async (otp: string) => {
        try {
            const res = await sendRequest<IResponse<object>>({
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/mail/send-verification-email`,
                method: "POST",

            });
            if (res.statusCode != 200) {
                message.error("Verify email fail.");
            }
            message.success(`Active account success.`);
        } catch {
            message.error("Verify email fail.");
        }
    };

    const handleResend = async () => {
        try {
            sendMail();
            message.info("Re-sent OTP");
        } catch {
            message.error("Can not send OTP");
        }
    };

    const maskEmail = (email: string) => {
        if (!email.includes("@")) return email; // không hợp lệ thì trả về như cũ

        const [local, domain] = email.split("@");
        if (local.length <= 3) {
            // nếu username ngắn, ví dụ abc@gmail.com → a**@gmail.com
            setHideMail(local[0] + "*".repeat(local.length - 1) + "@" + domain);
            return;
        }

        const visible = local.slice(0, 3); // 3 ký tự đầu
        const masked = "*".repeat(local.length - 3);
        setHideMail(`${visible}${masked}@${domain}`);
    }

    return <OtpVerifyCard hideEmail={hideMail} onVerify={handleVerify} onResend={handleResend} />;
};

export default VerifyOtpPage;
