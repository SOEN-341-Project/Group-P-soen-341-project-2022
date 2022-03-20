import './App.css';
import NavBar from './Components/NavBar';
import { SellerProductsPage } from './Components/Seller/SellerProductsPage';
import { SellerProductsForm } from './Components/Seller/SellerProductsForm';
import { ProductPage } from './Components/Products/ProductPage';
import { ProductDetails } from './Components/Products/ProductDetails';
import { CartPage } from './Components/CartPage';
import TestData from './TestValues.json';
import { Register } from './Components/RegisterPage';
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from 'react';


const Layout = () => {
    return (
        <>
            <NavBar sx={<h1></h1>}/>
            <div className="AppContent">
                <Outlet/>
            </div>
        </>
    )
};


export default function App() {
    const [cartCookie, setCookie] = useCookies(["cart"]);

    const getCartFromCookies = () =>{
        return cartCookie.cart.map(item =>{
            let itemData = TestData.products.find(product => product.id === item.id);
            return {
                id: itemData.id,
                name: itemData.name,
                image: itemData.image,
                description: itemData.description,
                seller: itemData.seller,
                brand: itemData.brand,
                price: itemData.price,
                quantity: item.quantity
            }
        });
    }

    let [cart] = useState(getCartFromCookies());

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ProductPage />}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/my-shopping-cart" element={<CartPage cartItems={cart}/>}/>
                    <Route path="/seller/add-product-form" element={<SellerProductsForm/>}/>
                    <Route path="/seller/:productId" element={<SellerProductsForm/>}/>
                    <Route path="/seller" element={<SellerProductsPage />}/>
                    <Route path="/:productId/:productName" element={<ProductDetails cartItems={cart}/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const NoPage = () => {
    return <h1>404</h1>;
};
