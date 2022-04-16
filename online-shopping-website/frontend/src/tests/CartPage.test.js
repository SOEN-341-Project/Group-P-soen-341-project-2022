import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartPage } from '../Components/Browse/CartPage';
import { BrowserRouter } from 'react-router-dom';

describe("CartPage Component", () => {
  it('should display empty message when cart is empty', () => {
    // Render CartPage, and get its container HTML element
    const { container } = render(<BrowserRouter><CartPage/></BrowserRouter>);

    // Ensure empty cart message is displayed on CartPage
    // Note: This works because cookies are empty in test environment
    expect(container.querySelector("p").innerHTML).toContain('Cart is empty');
  })
});
