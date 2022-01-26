import './App.css';
import { renderProductGrid } from './Components/ProductGrid';
import Products from './TestProducts.json';

function App() {
  return (
    <div className="AppContent">
      <h1>
        Bobble
      </h1>
      {renderProductGrid(Products)}
    </div>
  );
}

export default App;
