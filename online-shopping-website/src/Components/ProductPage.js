import Products from '../TestValues.json';
import Brands from '../TestValues.json';
import Sellers from '../TestValues.json';
import Grid from '@mui/material/Grid';
import { ProductGrid } from './ProductGrid';
import { SideNav } from './SideNav';
import { useState } from 'react';

// Encapsulates both SideNav and ProductGrid
export const ProductPage = (props) => {

  const [products, setProducts] = useState(Products.products);
  let [filters] = useState({ brands: [], sellers: [] });

  const onSideNavChange = (filterType, filterName, isChecked) => {
    // Add filter to filters state
    if (!isChecked) {
      if (filterType === 'Brand') {
        filters.brands.push(filterName);
      }
      else if (filterType === 'Seller') {
        filters.sellers.push(filterName);
      }
    }
    // Remove filter from filters state
    else {
      if (filterType === 'Brand') {
        filters.brands = filters.brands.filter((f) => f !== filterName);
      }
      else if (filterType === 'Seller') {
        filters.sellers = filters.sellers.filter((f) => f !== filterName);
      }
    }

    // Filter out products matching filters state
    setProducts(Products.products.filter(product => (
      !filters.brands.includes(product.brand) && !filters.sellers.includes(product.seller)
    )));
  }

  return (
    <Grid container columnSpacing={4} rowSpacing={5}>
      <Grid item xs={12} md={3} lg={2}>
        <SideNav brands={Brands} sellers={Sellers} onCheckboxChange={onSideNavChange} />
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <ProductGrid products={products}/>
      </Grid>
    </Grid>
  );
}
