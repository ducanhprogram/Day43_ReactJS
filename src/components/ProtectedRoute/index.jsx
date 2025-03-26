import config from "@/config";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);
        const fetchAPI = async () => {
            try {
                const response = await fetch(
                    `https://api01.f8team.dev/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw response;
                }

                const data = await response.json();
                console.log(data);
                setCurrentUser(data.user);
            } catch (e) {
                console.error(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!currentUser) {
        const path = encodeURIComponent(location.pathname);
        console.log(path);
        return (
            <Navigate
                to={`${config.routes.login}${path ? `?continue=${path}` : ""}`}
            />
        );
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.element,
};

export default ProtectedRoute;
