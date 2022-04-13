import './App.css';
import NavBar from './Components/NavBar';
import { SellerProductsPage } from './Components/Seller/SellerProductsPage';
import { SellerForm } from './Components/Seller/SellerProductsForm';
import { ProductPage } from './Components/Browse/Products/ProductPage';
import { ProductDetails } from './Components/Browse/Products/ProductDetails';
import { CartPage } from './Components/Browse/CartPage';
import { Register } from './Components/Profile/RegisterPage';
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ProfilePage } from "./Components/Profile/ProfilePage";
import { ViewOrders } from "./Components/Profile/ViewOrders";
import { AdminPage } from "./Components/Profile/AdminPage";


const Layout = () => {
    return (
        <>
            <NavBar sx={<h1></h1>} />
            <div className="AppContent">
                <Outlet />
            </div>
        </>
    );
};


export default function App() {
    const [cartCookie, setCookie] = useCookies(["cart"]);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ProductPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/my-shopping-cart" element={<CartPage />} />
                    <Route path="/seller/add-product-form" element={<SellerForm />} />
                    <Route path="/seller/:productId" element={<SellerForm />} />
                    <Route path="/seller" element={<SellerProductsPage />} />
                    <Route path="/admin/seller" element={<SellerProductsPage />} />
                    <Route path="/:productId/:productName" element={<ProductDetails />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/view-orders" element={<ViewOrders />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const NoPage = () => {
    return <h1>404</h1>;
};
