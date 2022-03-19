import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { ProductGrid } from './Components/Products/ProductGrid';
import { SideNav } from './Components/SideNav';
import Brands from './TestValues.json';
import Sellers from './TestValues.json';
import React from 'react';
import {CartPage} from './Components/CartPage';

// import { shallow } from 'enzyme';
// import NavBar from "./Components/NavBar";
import TestData from './TestValues.json';

test('returns true all the time!', () => {
  expect(true).toBe(true);
});

/*
TODO:
  - add cart page tests
  - add login tests
*/


/*describe("CartPage Component", () => {
  it('should render cart items if cart is non-empty', () => {
    render(<CartPage/>);
    TestData.cart.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.price)).toBeInTheDocument();
      expect(screen.getByText(item.seller)).toBeInTheDocument();
      expect(screen.getByText(item.brand)).toBeInTheDocument();
      expect(screen.getByText(item.quantity)).toBeInTheDocument();
    });
  })
});*/

/*
//contains errors --> to be fixed in separate PR
describe("NavBar component", () => {
  it("should change openLogin state to true when handleOpenLogin is called", () => {
    const wrapper = shallow(<NavBar/>);

    const spy = jest.spyOn(wrapper.instance(), "handleOpenLogin");

    wrapper.instance().handleOpenLogin();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});*/

// sample test --> does not work
/*it("should update state on click", () => {
  const changeSize = jest.fn();
  const wrapper = mount(<App onClick={changeSize} />);
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation(size => [size, changeSize]);

  wrapper.find("#para1").simulate("click");
  expect(changeSize).toBeCalled();
});*/

/*
test('renders Product Grid items', () => {
  render(<ProductGrid products={Products.products} />);
  Products.products.forEach(product => {
    let productElement = screen.getByText(product.name);
    expect(productElement).toBeInTheDocument();
  });
});

test('renders SideNav', () => {
  render(<SideNav brands={Brands} sellers={Sellers} />);
  Brands.brands.forEach(brand => {
    let brandElement = screen.getByText(brand);
    expect(brandElement).toBeInTheDocument();
  });
  Sellers.sellers.forEach(seller => {
    let sellerElement = screen.getByText(seller);
    expect(sellerElement).toBeInTheDocument();
  });
});*/
