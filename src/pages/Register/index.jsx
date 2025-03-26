import { useNavigate } from "react-router-dom";

import { useState } from "react";
import InputText from "@/components/InputText/InputText";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //Tác họ và tên
    const splitFullName = (fullName) => {
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts.pop();
        const lastName = nameParts.join(" ");
        return { firstName, lastName };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const { fullName, email, password, passwordConfirmation } = formData;

        if (password !== passwordConfirmation) {
            setErrors({
                passwordConfirmation: "Mật khẩu nhập lại không khớp.",
            });
            return;
        }
        const { firstName, lastName } = splitFullName(fullName);

        const payload = {
            firstName,
            lastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
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
            console.log(response, data);

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                } else if (
                    data.error &&
                    data.error.includes("Duplicate entry")
                ) {
                    setErrors({ fullName: "Tên đã được sử dụng" });
                } else if (data.message && data.message.includes("email")) {
                    setErrors({
                        email: "Email này đã được sử dụng. Vui lòng sử dụng email khác",
                    });
                } else if (data.message.includes("8 characters")) {
                    setErrors({
                        password: "Mật khẩu phải có ít nhất 8 ký tự!!!",
                    });
                }
                return;
            }
            localStorage.setItem("token", data.access_token);
            alert("Đăng ký thành công");
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
                        label={"Họ và tên"}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                    />
                </div>
                <div>
                    <InputText
                        label={"Email"}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </div>
                <div>
                    <InputText
                        label={"Mật khẩu"}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                </div>

                <div>
                    <InputText
                        label={"Nhập lại mật khẩu"}
                        type="password"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        error={errors.passwordConfirmation}
                    />
                </div>

                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
