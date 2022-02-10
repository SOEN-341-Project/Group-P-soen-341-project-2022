import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

export const ProductDetails = (props) => {
    return props.products.map(product => {
        return (
            <ProductInformation product={product}/>
        );
    });
}

const ProductInformation = (props) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={9}>
                <img src={props.product.image} alt={props.product.name}/>
                <p>{props.product.description}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Card>
                    <button>Add to cart</button>
                    <p>Quantity:</p>
                </Card>
            </Grid>
        </Grid>
    );
}