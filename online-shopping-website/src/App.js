import './App.css';
import {ProductPage} from './Components/ProductPage';
import {ProductDetails} from './Components/ProductDetails';
import Products from './TestValues.json';


function App() {
    return (
        <div className="AppContent">
            <h1>
                Bobble
            </h1>
            <ProductPage />
            {/*<ProductDetails products={Products.products[0]}/>*/}
        </div>
    );
}

export default App;
