import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { ProductGrid } from './Components/Products/ProductGrid';
import { SideNav } from './Components/SideNav';
import TestData from './TestValues.json';

test('returns true all the time!', () => {
  expect(true).toBe(true);
});

// test('renders Product Grid items', () => {
//   render(<ProductGrid products={Products.products} />);
//   Products.products.forEach(product => {
//     let productElement = screen.getByText(product.name);
//     expect(productElement).toBeInTheDocument();
//   });
// });

// test('renders SideNav', () => {
//   render(<SideNav brands={Brands} sellers={Sellers} />);
//   Brands.brands.forEach(brand => {
//     let brandElement = screen.getByText(brand);
//     expect(brandElement).toBeInTheDocument();
//   });
//   Sellers.sellers.forEach(seller => {
//     let sellerElement = screen.getByText(seller);
//     expect(sellerElement).toBeInTheDocument();
//   });
// });