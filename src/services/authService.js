import * as httpRequest from "@/utils/httpRequest";
import { Navigate } from "react-router-dom";

export const getCurrentUser = async () => {
    const response = await httpRequest.get("/auth/me");
    return response;
};

export const login = async (email, password) => {
    const response = await httpRequest.post("/auth/login", { email, password });
    httpRequest.setToken(response.access_token); // Lưu token sau khi đăng nhập
    return response;
};

export const logout = () => {
    httpRequest.setToken(null); // Xóa token khi đăng xuất
    Navigate("/login");
};

export default {
    getCurrentUser,
    login,
    logout,
};
