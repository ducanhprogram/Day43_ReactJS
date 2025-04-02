import InputTextHookForm from "@/components/InputText/InputTextHookForm";
import config from "@/config";
import useQuery from "@/hooks/useQuery";
import httpRequest from "@/utils/httpRequest";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

const Login2 = () => {
    const navigate = useNavigate();
    const query = useQuery();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        //call API
        console.log(data);
        reset();
    };

    console.log(errors);
    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputTextHookForm
                    label={"Email"}
                    type="email"
                    name="email"
                    error={errors.email?.message}
                    {...register("email", {
                        required: "Trường này là bắt buộc",
                        minLength: {
                            value: 2,
                            message: "Nhập ít nhất 2 ký tự",
                        },
                        maxLength: {
                            value: 20,
                            message: "Nhập tối đa 20 ký tự",
                        },
                    })}
                />

                {/* {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                )} */}
                <InputTextHookForm
                    label={"Mật khẩu"}
                    type="password"
                    name="password"
                    error={errors.password?.message}
                    {...register("password", {
                        required: "Trường này bắt buộc",
                        minLength: {
                            value: 8,
                            message: "Nhập ít nhất 8 ký tự",
                        },
                    })}
                />

                <button>Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login2;
