import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

export const ProductDetails = (props) => {
    return props.products.map(product => {
        return (
            <Grid item key={product.id} xs={12} md={6} lg={4}>
                <ProductInformation product={product}/>
            </Grid>
        );
    });
}

const ProductInformation = (props) => {
    return (
        <Grid container xs={12} sm={9}>
            <img src={props.product.image} alt={props.product.name}/>
            <p>{props.product.description}</p>
        </Grid>
        <Grid container xs={12} sm={3}>
            <Card>
                <button>Add to cart</button>
                <p>Quantity:</p>
            </Card>
        </Grid>
    );
}