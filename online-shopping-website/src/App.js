import './App.css';

import NavBar from './Components/NavBar';
import {ProductPage} from './Components/ProductPage';
import {ProductPreview} from './Components/ProductGrid';
import {ProductDetails} from './Components/ProductDetails';
import {SearchBar} from './Components/SearchBar';
import {useState} from 'react';
import Products from './TestValues.json';
import ReactDOM from "react-dom";
import {BrowserRouter, Outlet, Link, Routes, Route} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <NavBar sx={<h1></h1>}/>
            {/*<nav>
                <ul>
                    <li>
                        <Link to="/">Products</Link>
                    </li>
                    <li>
                        <Link to="/samplePage">Sample Page</Link>
                    </li>
                </ul>
            </nav>*/}
            <div className="AppContent">
                <Outlet/>
            </div>
        </>
    )
};

export default function App() {
    // Products that will render
    const [products, setProducts] = useState(Products.products);

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
        setProducts(Products.products.filter(product => (
            (product.name.split(' ').some(word => word.search(query) > -1) || product.name.search(query) > -1)
            && (filters.lowestPrice ? (product.price >= filters.lowestPrice) : true)
            && (filters.highestPrice ? (product.price <= filters.highestPrice) : true)
            && !filters.brands.includes(product.brand)
            && !filters.sellers.includes(product.seller)
        )));
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ProductPage filterProducts={filterProducts} filters={filters}
                           products={products}/>}/>
                    {/*Sample routing, can add any additional necessary pages here*/}
                    <Route path="/samplePage" element={<SamplePage/>}/>
                    <Route path="/:productName" element={<ProductDetails/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const SamplePage = () => {
    return <h1>Sample Page</h1>;
}

const NoPage = () => {
    return <h1>404</h1>;
};
