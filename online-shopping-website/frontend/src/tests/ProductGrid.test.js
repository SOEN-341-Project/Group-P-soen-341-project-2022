/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProductGrid } from '../Components/Browse/Products/ProductGrid'
import * as React from 'react';
import { BrowserRouter } from "react-router-dom";
import axios from "axios"



jest.setTimeout(1000 * 60 * 2);

const testProducts = [
  {
    id: 1,
    name: 'thing 1',
    picture: 'https://www.irishtimes.com/polopoly_fs/1.3628113.1536842312!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
    brand: {name : 'Test product 1'},
    seller: {sellerName : 'Test seller 1'},
  },
  {
    id: 2,
    name: 'thing 2',
    picture: 'https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg',
    brand: {name : 'Test product 2'},
    seller: {sellerName : 'Test seller 2'},
  }
]

describe('Product Grid Tests', () => {
  // check if product grid has changed or not
  test('should render', () => {
    const component = render(<BrowserRouter><ProductGrid products={testProducts} /></BrowserRouter>);
    expect(component).toMatchSnapshot();
  });
  // check if iterate products work by seeing if all the products have their titles in the product grid
  test('all titles are present', async () => {
    const resProducts = await axios.get('https://api.bobbleshop.me/api/items/all');
    const products = resProducts.data;
    const component = render(<BrowserRouter><ProductGrid products={products} /></BrowserRouter>);
    const allTitlesPresent = products.every(async (product) => {(component.getAllByText(product.name)).length > 0});
    expect(allTitlesPresent).toBe(true);
  });
});