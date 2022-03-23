import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { ProductGrid } from './ProductGrid';
import { SideNav } from './SideNav';
import axios from 'axios';

// Encapsulates both SideNav and ProductGrid
export const ProductPage = () => {
  // Getting backend products
  const [products, setProducts] = useState(null);
  const [brands, setBrands] = useState(null);
  const [sellers, setSellers] = useState(null);
  const [loading, setLoading] = useState(true);

  const [unfilteredProducts, setUnfilteredProducts] = useState(null);

  useEffect(() => {
    const getProducts = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/items/all');
    const getBrands = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/brands/all');
    const getSellers = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/users/sellers');

    axios.all([getProducts, getBrands, getSellers]).then(
      axios.spread((resProducts, resBrands, resSellers) => {
        setProducts(resProducts.data);
        setUnfilteredProducts(resProducts.data);
        setBrands(resBrands.data);
        setSellers(resSellers.data);
        setLoading(false);
      })
    );
  }, []);

  // Filters
  let [filters] = useState({
    searchQuery: '',
    brands: [],
    sellers: [],
    lowestPrice: null,
    highestPrice: null,
  });

  const filterProducts = () => {
    // Use RegEx for search query
    /*
          ^ = Match beginning of product name
          i = Case insensitive
      */
    const query = new RegExp('^' + filters.searchQuery, 'i');

    // Filter products according to search query, are within price range, and don't belong to brands or sellers arrays
    setProducts(
      unfilteredProducts.filter(
        (product) =>
          (product.name.split(' ').some((word) => word.search(query) > -1) || product.name.search(query) > -1) &&
          (filters.lowestPrice ? product.price >= filters.lowestPrice : true) &&
          (filters.highestPrice ? product.price <= filters.highestPrice : true) &&
          !filters.brands.includes(product.brand.name) &&
          !filters.sellers.includes(product.seller.sellerName)
      )
    );
  };

  const onSliderChange = (priceRange) => {
    // Set price range from slider
    filters.lowestPrice = priceRange[0];
    filters.highestPrice = priceRange[1];

    // Update product state with filters
    filterProducts();
  };

  const onCheckboxChange = (filterType, filterName, isChecked) => {
    // Unchecked checkbox -> Add filter to filters state
    if (!isChecked) {
      if (filterType === 'Brand') {
        filters.brands.push(filterName);
      } else if (filterType === 'Seller') {
        filters.sellers.push(filterName);
      }
    }
    // Checked checkbox -> Remove filter from filters state
    else {
      if (filterType === 'Brand') {
        filters.brands = filters.brands.filter((f) => f !== filterName);
      } else if (filterType === 'Seller') {
        filters.sellers = filters.sellers.filter((f) => f !== filterName);
      }
    }

    // Update product state with filters
    filterProducts();
  };

  // Waiting for products during GET
  if (loading) {
    return <h1>Loading products...</h1>;
  }

  console.log("Brands: "+ brands + " , Sellers: " + sellers)
  return (
    <Grid container columnSpacing={4} rowSpacing={5}>
      <Grid item xs={12} md={3} lg={2}>
        <SideNav
          unfilteredProducts={unfilteredProducts}
          brands={brands}
          sellers={sellers}
          filterProducts={filterProducts}
          filters={filters}
          onCheckboxChange={onCheckboxChange}
          onSliderChange={onSliderChange}
        />
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <ProductGrid products={products} />
      </Grid>
    </Grid>
  );
};
