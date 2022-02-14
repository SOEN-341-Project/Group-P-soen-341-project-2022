import './App.css';
import {ProductPage} from './Components/ProductPage';
import {ProductPreview} from './Components/ProductGrid';
import {ProductDetails} from './Components/ProductDetails';
import ReactDOM from "react-dom";
import {BrowserRouter, Outlet, Link, Routes, Route} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ProductPage/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/:productName" element={<ProductDetails/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// Format navbar using similar linking
const Layout = () => {
    return (
        <>
            <div className="AppContent">
                <h1>Bobble</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">ProductPage</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
};

const Home = () => {
    return <h1>Home</h1>;
}

const NoPage = () => {
    return <h1>404</h1>;
};


