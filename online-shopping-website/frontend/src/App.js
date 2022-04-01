import './App.css';
import NavBar from './Components/NavBar';
import { SellerProductsPage } from './Components/Seller/SellerProductsPage';
import { ModifyProductForm, AddNewProductForm } from './Components/Seller/SellerProductsForm';
import { ProductPage } from './Components/Products/ProductPage';
import { ProductDetails } from './Components/Products/ProductDetails';
import { CartPage } from './Components/CartPage';
import { Register } from './Components/RegisterPage';
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ProfilePage } from "./Components/Profile/ProfilePage";
import ViewOrders from "./Components/ViewOrders";


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
                    <Route path="/seller/add-product-form" element={<AddNewProductForm />} />
                    <Route path="/seller/:productId" element={<ModifyProductForm />} />
                    <Route path="/seller" element={<SellerProductsPage />} />
                    <Route path="/:productId/:productName" element={<ProductDetails />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/view-orders" element={<ViewOrders />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const NoPage = () => {
    return <h1>404</h1>;
};
