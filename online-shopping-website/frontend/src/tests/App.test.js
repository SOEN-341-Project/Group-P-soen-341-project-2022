/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../Components/NavBar';
import { BrowserRouter } from 'react-router-dom';

describe("NavBar component", () => {
  it("renders product and cart buttons", () => {
    const { container } = render(<BrowserRouter><NavBar /></BrowserRouter>);

    // Expect first button to display "Product", and second to display "My Cart"
    expect(container.querySelectorAll(".navbar-links").item(0).innerHTML).toBe("Products");
    expect(container.querySelectorAll(".navbar-links").item(1).innerHTML).toBe("My Cart");
  });
});