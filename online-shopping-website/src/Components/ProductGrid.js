import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';

const ProductPreview = (props) => {
  return (
    <Card className="ProductContainer">
      <Grid container>
        {/* First column of Product Card. Image renders on top of Card on lg and smaller screens. Renders on the left for lg and xl screens. */}
        <Grid item xs={12} xl={6} sx={{ textAlign: 'center' }}>
          <div className="ProductImageHelper"></div>
          <img className="ProductImage" src={props.product.image} alt={props.product.name} />
        </Grid>

        {/* Second column. Contains all text and Buttons. */}
        <Grid item xs={12} sm container>
          <Grid item container direction="column">
            <Grid item xs sx={{ paddingX: '10px' }}>
              <h3>{props.product.name}</h3>
              <h4>Brand: {props.product.brand}</h4>
              <p>{props.product.description}</p>
              <h4>Sold by: {props.product.seller}</h4>
              <h4>Price: {props.product.price} Ɖ</h4>
              <CardActions sx={{ marginLeft: '-10px' }}>
                <Button variant="contained" className="ProductButtonContained">Add to Cart</Button>
                <Button variant="outlined" className="ProductButton">Learn More</Button>
              </CardActions>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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