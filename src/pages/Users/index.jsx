import { Link } from "react-router-dom";

import config from "@/config";
import { useEffect, useState } from "react";

/*
Route: /users/:id

Link to: /users/${product.id}
*/

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await fetch(
                    `https://api01.f8team.dev/api/users`
                );

                const res = await response.json();
                setUsers(res.data);
            } catch (e) {
                console.error(e.message);
            }
        };
        fetchAPI();
    }, []);

    return (
        <div>
            <h1>Users Page</h1>s
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link to={`${config.routes.users}/${user.slug}`}>
                                {user.firstName + " " + user.lastName}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Users;
