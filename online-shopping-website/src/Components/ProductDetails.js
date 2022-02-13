import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

class ProductButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            show: true,
            max: 5,
            min: 0
        };
    }

    IncrementItem = () => {
        if (this.state.quantity != 10) {
            this.setState({
                quantity: this.state.quantity + 1
            });
        }
    }
    DecreaseItem = () => {
        if (this.state.quantity != 1) {
            this.setState({quantity: this.state.quantity - 1});
        }
    }

    UpdateValue = (e) => {
        this.setState({quantity: e.target.value});
    }

    render() {
        return (
            <div>
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" endIcon={<AddIcon/>} disabled={this.state.quantity == 10}
                            onClick={this.IncrementItem}/>
                    <input className="inputne" value={this.state.quantity} onChange={this.UpdateValue}/>
                    <Button variant="contained" endIcon={<RemoveIcon/>} disabled={this.state.quantity == 1}
                            onClick={this.DecreaseItem}/>
                </Stack>
                <h5>Limit of 10 items per product in cart.</h5>
                <Button variant="contained" endIcon={<AddShoppingCartIcon/>}>
                    Add to cart
                </Button>
            </div>
        );
    }
}

export const ProductDetails = (props) => {
    // return (
    //     <ProductInformation product={props}/>
    // );
    return (
        <Grid item>
            <Grid item xs={12} sm={9}>
                <img src={props.product.image} alt={props.product.name}/>
                <p>{props.product.description}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Card>
                    <h4>Quantity</h4>
                    <ProductButtons/>
                </Card>
            </Grid>
        </Grid>
    );
}

/*
const ProductInformation = (props) => {
    return (
        <Grid item>
            <Grid item xs={12} sm={9}>
                <img src={props.image} alt={props.name}/>
                <p>{props.product.description}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Card>
                    <h4>Quantity</h4>
                    <ProductButtons/>
                </Card>
            </Grid>
        </Grid>
    );
}*/
