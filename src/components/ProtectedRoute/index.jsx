import config from "@/config";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchAPI = async () => {
            try {
                const response = await fetch(
                    `https://api01.f8team.dev/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw response;
                }

                const data = await response.json();
                setCurrentUser(data.user);
                return data;
            } catch (e) {
                console.error(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
    }, []);

    if (!isLoading) {
        return <p>Loading...</p>;
    }

    if (!currentUser) {
        const path = encodeURIComponent(location.pathname);
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
