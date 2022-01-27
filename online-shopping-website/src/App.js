import './App.css';
import ProductGrid from './Components/ProductGrid';
import Products from './TestProducts.json';

function App() {
  return (
    <div className="AppContent">
      <h1>
        Bobble
      </h1>
      <ProductGrid products={Products} />
    </div>
  );
}

export default App;
