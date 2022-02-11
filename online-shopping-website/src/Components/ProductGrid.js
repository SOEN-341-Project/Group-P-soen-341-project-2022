import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import React from 'react';
import Stack from '@mui/material/Stack';
import { ProductDetails } from './ProductDetails'

const ProductPreview = (props) => {
  return (
    <ButtonBase LinkComponent={ProductDetails} sx={{ width: '100%', textAlign: 'left', margin: 0, padding: 0, borderRadius: '15px'}} >
      <Card className="ProductContainer">
        <Stack sx={{ height: '100%' }} direction="column" justifyContent="space-between">
          {/* Image */}
          <Stack direction="row" justifyContent="center" sx={{ textAlign: 'center' }}>
            <img className="ProductImage" src={props.product.image} alt={props.product.name} />
          </Stack>

          {/* Product information */}
          <div>
            <h3>{props.product.name}</h3>
            <p>Brand: {props.product.brand}</p>
            <p>Sold by: {props.product.seller}</p>
          </div>

          {/* Product price */}
          <h4 className="ProductPrice">{props.product.price} Ɖ</h4>
        </Stack>
      </Card>
    </ButtonBase>
  );
}

// Creates a Grid item with a ProductPreview for each product in inputted data. Sets element keys to product ids.
const iterateProducts = (data) => {
  return data.products.map(product => {
    return (
      <Grid item key={product.id} xs={12} md={6} lg={4}>
        <ProductPreview key={product.id} product={product} />
      </Grid>
    );
  });
}

export const ProductGrid = (props) => { 
  return (
    <Grid container spacing={5} rowSpacing={5}>
      {iterateProducts(props)}
    </Grid>
  );
}