import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { ProductGrid } from './Components/ProductGrid';
import { SideNav } from './Components/SideNav';
import Products from './TestValues.json';
import Brands from './TestValues.json';
import Sellers from './TestValues.json';

test('renders', () => {
  render(<ProductGrid products={Products} />);
  Products.products.forEach(product => {
    let productElement = screen.getByText(product.name);
    expect(productElement).toBeInTheDocument();
  });
});

test('renders', () => {
  render(<SideNav brands={Brands} sellers={Sellers} />);
  Brands.brands.forEach(brand => {
    let brandElement = screen.getByText(brand);
    expect(brandElement).toBeInTheDocument();
  });
  Sellers.sellers.forEach(seller => {
    let sellerElement = screen.getByText(seller);
    expect(sellerElement).toBeInTheDocument();
  });
});