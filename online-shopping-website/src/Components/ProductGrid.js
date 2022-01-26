import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ProductPreview = (props) => {
  return (
    <Card className="ProductContainer">
      <Grid container>
        {/* First column of Product Card. Image renders on top of Card on lg and smaller screens. Renders on the left for lg and xl screens. */}
        <Grid item xs={12} xl={6} sx={{ textAlign: 'center' }}>
          <div className="ProductImageHelper"></div>
          {/* Card Media crops parts of images as they resize. May be an option, but custom CSS is preferred. */}
          {/* <CardMedia
            component="img"
            alt={props.product.name}
            height="200"
            image={props.product.image}
            className="ProductImage"
          /> */}
          <img className="ProductImage" src={props.product.image} alt={props.product.name} />
        </Grid>

        {/* Second column. Contains all text and Buttons. */}
        <Grid item xs={12} sm container>
          <Grid item container direction="column">
            <Grid item xs sx={{ paddingX: '10px' }}>
              <h3>{props.product.name}</h3>
              <p>{props.product.description}</p>
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
const iterateProduct = (data) => {
  return data.products.map(product => {
    return (
      <Grid item key={product.id} xs={12} sm={6} lg={4}>
        <ProductPreview key={product.id} product={product} />
      </Grid>
    );
  })
}

// Renders Product Grid made up of inputted products.
export const renderProductGrid = (products) => {
  return (
    <Grid container spacing={2} rowSpacing={5}>
      {iterateProduct(products)}
    </Grid>
  );
}