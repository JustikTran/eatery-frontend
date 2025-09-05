"use client";

import { sendRequest } from "@/utils/api";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface IData {
    token: string,
    account: IAccount
}

interface AuthContextType {
    account: IAccount | null;
    token: string | null;
    login: (username: string, password: string) => Promise<{ ok: boolean; message: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [account, setAccount] = useState<IAccount | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setToken(null);
                return;
            }

            try {
                const res = await sendRequest<IResponse<IAccount>>({
                    url: `${process.env.NEXT_PUBLIC_API_BACKEND}/odata/account/token`,
                    method: "GET",
                    body: {
                        token: token
                    },
                    headers: { Authorization: `Bearer ${token}` },
                })
                setAccount(res.data ?? null);
            } catch {
                logout();
            }
        }

        fetchUser();
    }, [token]);

    useEffect(() => {
        // Load từ localStorage nếu có
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const login = async (username: string, password: string): Promise<{ ok: boolean; message: string }> => {
        try {
            const res = await sendRequest<IResponse<IData>>({
                url: `${process.env.NEXT_PUBLIC_API_BACKEND}/auth/sign-in`,
                method: "POST",
                body: {
                    Username: username,
                    Password: password
                }
            });

            const data = await res.data;
            if (res.statusCode != 200) {
                // Nếu API trả về message cụ thể thì lấy, không thì fallback
                return { ok: false, message: res.message ?? "Đăng nhập thất bại" };
            }
            if (data?.token) {
                setToken(data.token);
                Cookies.set("token", data.token, { expires: 365 });
                localStorage.setItem("token", data.token);
                return { ok: true, message: res.message ?? "" };
            }

            return { ok: false, message: res.message ?? "Đăng nhập thất bại" };
        } catch (error) {
            console.error(error);
            return { ok: false, message: "Có lỗi xảy ra, vui lòng thử lại sau" };
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ account, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
