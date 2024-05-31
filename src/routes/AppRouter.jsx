import { createBrowserRouter, Navigate, Router, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import RegisterPage from "../pages/RegisterPage";


const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProductPage />
        },
        {
            path: "/products",
            element: <ProductPage />
        },
        {
            path: "/register",
            element: <RegisterPage />
        },
        {
            path: "/login",
            element: <LoginPage />
        },
        {
            path: "/products/:productId",
            element: <ProductDetailPage />
        }
    ]);

    return ( 
        <RouterProvider router={router} />
     );
}
 
export default AppRouter;