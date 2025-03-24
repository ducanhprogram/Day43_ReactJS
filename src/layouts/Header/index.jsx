import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = async () => {
        if (!token) {
            navigate("/");
            return;
        }

        try {
            const response = await fetch(
                ` https://api01.f8team.dev/api/auth/logout`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();

            if (response.ok && data.status === "success") {
                localStorage.removeItem("token");
                navigate("/");
            } else {
                console.error("Đăng xuất thất bại: ", data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
            }}
        >
            {token ? (
                <button onClick={handleLogout}>Đăng xuất</button>
            ) : (
                <div>
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Đăng nhập
                    </button>

                    <button
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Đăng ký
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
