import './App.css';
import { ProductPage } from './Components/ProductPage';
import { SearchBar } from './Components/SearchBar';
import { useState } from 'react';
import Products from './TestValues.json';

function App() {
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
        // Filter products according to search query, are within price range, and don't belong to brands or sellers arrays
        setProducts(Products.products.filter(product => (
            (product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()))
            && (filters.lowestPrice ? (product.price >= filters.lowestPrice) : true)
            && (filters.highestPrice ? (product.price <= filters.highestPrice) : true)
            && !filters.brands.includes(product.brand)
            && !filters.sellers.includes(product.seller)
        )));
    }    

    return (
        <div className="AppContent">
            <h1>
                Bobble
            </h1>
            <SearchBar filterProducts={filterProducts} filters={filters} />
            <ProductPage filterProducts={filterProducts} filters={filters} products={products} />
        </div>
    );
}

export default App;
