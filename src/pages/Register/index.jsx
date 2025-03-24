import InputText from "@/components/InputText/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const splitFullName = (name) => {
        const parts = name.trim().split(" ");
        return {
            firstName: parts.pop(),
            lastName: parts.join(" "),
        };
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const { fullName, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setErrors({ confirmPassword: "Mật khẩu không khớp" });
            return;
        }

        const { firstName, lastName } = splitFullName(fullName);

        const payload = {
            firstName,
            lastName,
            email,
            password,
            password_confirmation: confirmPassword,
        };

        try {
            const response = await fetch(
                `https://api01.f8team.dev/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                }

                if (data.message && data.message.includes("email")) {
                    setErrors({
                        email: "Email này đã được sử dụng. Vui lòng sử dụng email khác",
                    });
                }
                return;
            }

            localStorage.setItem("token", data.access_token);
            navigate("/");
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
        }
    };

    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputText
                        label="Họ và tên"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                    />
                </div>
                <div>
                    <InputText
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </div>
                <div>
                    <InputText
                        label="Mật khẩu"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                </div>

                <div>
                    <InputText
                        label="Nhập lại mật khẩu"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                    />
                </div>
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
