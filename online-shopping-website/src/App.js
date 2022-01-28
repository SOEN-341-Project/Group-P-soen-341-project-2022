import './App.css';
import {ProductGrid} from './Components/ProductGrid';
import {SideNav} from './Components/SideNav';
import Products from './TestProducts.json';
import Brands from './TestProducts.json';
import Sellers from './TestProducts.json';

function App() {
    return (
        <div className="AppContent">
            <h1>
                Bobble
            </h1>
            <SideNav brands={Brands} sellers={Sellers}/>
            <ProductGrid products={Products}/>
        </div>
    );
}

export default App;
