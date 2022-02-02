import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';
import Stack from '@mui/material/Stack';

const ProductPreview = (props) => {
  return (
    <Card className="ProductContainer">
      <Stack direction="column" justifyContent="space-between">
        {/* Image */}
        <Stack direction="row" justifyContent="center" sx={{ textAlign: 'center' }}>
          <div className="ProductImageHelper"></div>
          <img className="ProductImage" src={props.product.image} alt={props.product.name} />
        </Stack>

        {/* Product information */}
        <Stack spacing={2} direction="column" justifyContent="space-between">
            <h3>{props.product.name}</h3>
            <h4>Brand: {props.product.brand}</h4>
            <p>{props.product.description}</p>
            <h4>Sold by: {props.product.seller}</h4>
            <h4>Price: {props.product.price} Ɖ</h4>
        </Stack>

        {/* Buttons */}
        <Stack spacing={1} sx={{width: '100%', paddingY: '20px'}}>
          <Button variant="contained" className="ProductButtonContained">Add to Cart</Button>
          <Button variant="outlined" className="ProductButton">Learn More</Button>
        </Stack>
      </Stack>
    </Card>
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
    <Grid container spacing={5} rowSpacing={8}>
      {iterateProducts(props)}
    </Grid>
  );
}