import config from "@/config";
import Home from "../Home";
import Products from "../Products";
import AdminLayout from "@/layouts/AdminLayout";
import ProductDetail from "../ProductDetail";
import Users from "../Users";

import Register from "../Register";
import Login from "../Login";
import NotFound from "../NotFound.jsx";

const routes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.products,
        component: Products,
        layout: AdminLayout,
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
        layout: null,
        protected: true,
    },

    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.users,
        component: Users,
        protected: true,
    },
    {
        path: config.routes.notFound,
        component: NotFound,
    },
];

export default routes;
