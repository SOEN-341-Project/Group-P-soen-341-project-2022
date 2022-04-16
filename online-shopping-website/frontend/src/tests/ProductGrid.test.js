/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from "axios"
import { ProductGrid } from '../Components/Browse/Products/ProductGrid'
import { BrowserRouter } from "react-router-dom";

const testProducts = [
  {
    id: 1,
    name: 'thing 1',
    picture: 'https://www.irishtimes.com/polopoly_fs/1.3628113.1536842312!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
    brand: {name : 'Test product 1'},
    seller: {sellerName : 'Test seller 1'},
    price: 30
  },
  {
    id: 2,
    name: 'thing 2',
    picture: 'https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg',
    brand: {name : 'Test product 2'},
    seller: {sellerName : 'Test seller 2'},
    price: 40
  }
];

describe('Product Grid Component', () => {
  // check if product grid has changed or not
  it('should render', () => {
    const component = render(<BrowserRouter><ProductGrid products={testProducts} /></BrowserRouter>);
    expect(component).toMatchSnapshot();
  });
  
  // check if iterate products works by seeing if all the products have their names in the product grid
  it('displays all product names', async () => {
    const products = (await axios.get('https://api.bobbleshop.me/api/items/all')).data;
    const component = render(<BrowserRouter><ProductGrid products={products} /></BrowserRouter>);
    const allProductNamesPresent = products.every(product => (component.getAllByText(product.name)).length > 0);
    expect(allProductNamesPresent).toBe(true);
  });
});