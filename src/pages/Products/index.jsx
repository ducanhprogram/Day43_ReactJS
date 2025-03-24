import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import config from "@/config";

/*
Route: /products/:id

Link to: /products/${product.id}
*/

const Products = () => {
    const [result, isLoading] = useFetch(
        `https://api01.f8team.dev/api/products`
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // console.log({ products, isLoading });
    return (
        <div>
            <h1>Products Page</h1>
            {isLoading && <div>Loading...</div>}
            <ul>
                {result.data.map((product) => {
                    return (
                        <li key={product.id}>
                            <Link
                                to={`${config.routes.products}/${product.slug}`}
                            >
                                {product.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Products;
