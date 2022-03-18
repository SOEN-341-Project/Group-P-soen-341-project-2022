import './App.css';
import NavBar from './Components/NavBar';
import { SellerProductsPage } from './Components/Seller/SellerProductsPage';
import { ModifyProductForm, AddNewProductForm } from './Components/Seller/SellerProductsForm';
import { ProductPage } from './Components/ProductPage';
import { ProductDetails } from './Components/ProductDetails';
import { CartPage } from './Components/CartPage';
import TestData from './TestValues.json';
import { Register } from './Components/RegisterPage';
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";

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
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<ProductPage />}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/my-shopping-cart" element={<CartPage cart={TestData.cart}/>}/>
                  <Route path="/seller/add-product-form" element={<AddNewProductForm />}/>
                  <Route path="/seller/:productId" element={<ModifyProductForm />}/>
                  <Route path="/seller" element={<SellerProductsPage />}/>
                  <Route path="/:productId/:productName" element={<ProductDetails/>}/>
                  <Route path="*" element={<NoPage/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
};

const NoPage = () => {
  return <h1>404</h1>;
};
