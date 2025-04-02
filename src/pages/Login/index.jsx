import InputText from "@/components/InputText/InputText";
import config from "@/config";
import useQuery from "@/hooks/useQuery";
import httpRequest from "@/utils/httpRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const query = useQuery();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { email, password } = formData;
        try {
            const response = await fetch(
                `https://api01.f8team.dev/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (!response.ok && data.status === "error") {
                setError("Email hoặc mật khẩu không hợp lệ");
                return;
            }

            httpRequest.setToken(data.access_token);
            const continuePath = query.get("continue") || config.routes.home;
            navigate(continuePath);
            console.log(response, data);
        } catch (e) {
            console.error("Lỗi khi gọi API login: ", e);
            setError("Có lỗi xảy ra, vui lòng thử lại. ");
        }
    };
    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <InputText
                    label={"Email"}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <InputText
                    label={"Mật khẩu"}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {error && (
                    <p style={{ color: "red", marginBottom: "15px" }}>
                        {error}
                    </p>
                )}
                <button>Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
