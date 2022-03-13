import './App.css';
import NavBar from './Components/NavBar';
import { SellerProductsPage } from './Components/Seller/SellerProductsPage';
import { SellerProductsForm } from './Components/Seller/SellerProductsForm';
import { ProductPage } from './Components/Products/ProductPage';
import { ProductDetails } from './Components/Products/ProductDetails';
<<<<<<< HEAD
import {Register} from './Components/RegisterPage';
import { CartPage } from './Components/CartPage';
import TestData from './TestValues.json';
=======
import { CartPage } from './Components/CartPage';
import { useState } from 'react';
import TestData from './TestValues.json';
import { Register } from './Components/RegisterPage';
>>>>>>> 7d88f7f638b6340bfac5312a417b9beac248e46d
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";

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
<<<<<<< HEAD
=======
    // Products that will render
    const [products, setProducts] = useState(TestData.products);

    // Filters
    let [filters] = useState(
        {
            searchQuery: '',
            brands: [],
            sellers: [],
            lowestPrice: null,
            highestPrice: null
        }
    );

    const filterProducts = () => {
        // Use RegEx for search query
        /*
            ^ = Match beginning of product name
            i = Case insensitive
        */
        const query = new RegExp('^' + filters.searchQuery, 'i');

        // Filter products according to search query, are within price range, and don't belong to brands or sellers arrays
        setProducts(TestData.products.filter(product => (
            (product.name.split(' ').some(word => word.search(query) > -1) || product.name.search(query) > -1)
            && (filters.lowestPrice ? (product.price >= filters.lowestPrice) : true)
            && (filters.highestPrice ? (product.price <= filters.highestPrice) : true)
            && !filters.brands.includes(product.brand)
            && !filters.sellers.includes(product.seller)
        )));
    }

>>>>>>> 7d88f7f638b6340bfac5312a417b9beac248e46d
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ProductPage />}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/my-shopping-cart" element={<CartPage cart={TestData.cart}/>}/>
                    <Route path="/seller/add-product-form" element={<SellerProductsForm/>}/>
                    <Route path="/seller/:productId" element={<SellerProductsForm/>}/>
                    <Route path="/seller" element={<SellerProductsPage />}/>
                    <Route path="/:productId/:productName" element={<ProductDetails/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const NoPage = () => {
    return <h1>404</h1>;
};
