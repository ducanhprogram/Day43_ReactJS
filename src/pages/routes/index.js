import config from "@/config";
import Home from "../Home";
import Products from "../Products";
import AdminLayout from "@/layouts/AdminLayout";
import ProductDetail from "../ProductDetail";
import Users from "../Users";
import Register from "../Register";
import Login from "../Login/Login";
import NoFooterLayout from "@/layouts/NoFooterLayout";

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
    },
    {
        path: config.routes.register,
        component: Register,
        layout: NoFooterLayout,
    },

    {
        path: config.routes.login,
        component: Login,
        layout: NoFooterLayout,
        protected: false,
    },
    {
        path: config.routes.users,
        component: Users,
        protected: true,
    },
];

export default routes;
