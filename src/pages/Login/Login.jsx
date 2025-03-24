import InputText from "@/components/InputText/InputText";
import config from "@/config";
import useQuery from "@/hooks/useQuery";
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
                "https://api01.f8team.dev/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                setError("Email hoặc mật khẩu không hợp lệ.");
                return;
            }

            localStorage.setItem("token", data.access_token);
            const continuePath = query.get("continue") || config.routes.home;
            navigate(continuePath);
        } catch (error) {
            console.error("Lỗi khi gọi API login: ", error);
            setError("Có lỗi xảy ra, vui lòng thử lại. ");
        }
    };

    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputText
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={error && formData.email === "" ? error : ""}
                    />
                </div>

                <div>
                    <InputText
                        label="Mật khẩu"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={error && formData.password === "" ? error : ""}
                    />
                </div>
                {error && (
                    <p style={{ color: "red", marginBottom: "15px" }}>
                        {error}
                    </p>
                )}
                <button
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    type="submit"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default Login;
