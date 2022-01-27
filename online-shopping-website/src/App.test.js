import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { ProductGrid } from './Components/ProductGrid';
import Products from './TestProducts.json';

test('renders', () => {
  render(<ProductGrid products={Products} />);
  Products.products.forEach(product => {
    let productElement = screen.getByText(product.name);
    expect(productElement).toBeInTheDocument();
  });
});
