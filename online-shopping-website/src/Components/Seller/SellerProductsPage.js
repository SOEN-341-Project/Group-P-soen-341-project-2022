import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import React from 'react';
import Stack from '@mui/material/Stack';

export const SellerProductsPage = (props) => {
    return (
        <Link to={{
            pathname: `/${props.product.id}`,
            params: { props }
        }} className="RoutingLink">
            <h1>{props.product.name}</h1>
            <ButtonBase sx={{ width: '100%', textAlign: 'left', margin: 0, padding: 0, borderRadius: '15px' }}>
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

                        <Grid>
                            {/* Product price */}
                            <h4 className="ProductPrice">{props.product.price} Ɖ</h4>
                        </Grid>
                    </Stack>
                </Card>
            </ButtonBase>
        </Link>
    );
}