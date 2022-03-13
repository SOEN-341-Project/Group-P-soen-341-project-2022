import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Link, useParams} from 'react-router-dom';
import TestData from '../../TestValues.json';


class ProductButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props,
            quantity: 1,
            show: true,
            max: 5,
            min: 0,
        };
    }

    IncrementItem = () => {
        if (this.state.quantity !== 10) {
            this.setState({
                quantity: this.state.quantity + 1
            });
        }
    }
    DecreaseItem = () => {
        if (this.state.quantity !== 1) {
            this.setState({quantity: this.state.quantity - 1});
        }
    }

    AddToCart = () => {
        // Add remaining logic for modifying cart cookie
        let item = this.state.item;
        const newCartItem =     {
            id: item.id,
            name: item.name,
            image: item.img,
            description: item.description,
            seller: item.seller,
            brand: item.brand,
            price: item.quantity,
            quantity: this.state.quantity
        }

        //replace TestData.cart with cart cookie
        TestData.cart.append(newCartItem);
        console.log(TestData.cart);
    }

    UpdateValue = (e) => {
        const inputValue = Number(e.target.value);

        if ((inputValue < 1) || (inputValue.isNaN)) {
            this.setState({quantity: 1});
        } else if (inputValue > 10) {
            this.setState({quantity: 10});
        } else {
            this.setState({quantity: inputValue});
        }
    }

    render() {
        return (
            <div className="ProductDetails-QuantityButtonsContainer">
                <h3 className='TextGreen'>Quantity</h3>
                <Stack className="ProductDetails-QuantityButtonsStack" direction="row" spacing={1}>
                    <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                            disabled={this.state.quantity === 1}
                            onClick={this.DecreaseItem}>
                        <RemoveIcon/>
                    </Button>
                    <input className="inputne" disabled={true} value={this.state.quantity} onChange={this.UpdateValue}/>
                    <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                            disabled={this.state.quantity === 10}
                            onClick={this.IncrementItem}>
                        <AddIcon/>
                    </Button>
                </Stack>
                <h5 className="ProductDetails-ProductLimitText">Limit of 10 items per product in cart.</h5>
                <Link to="/my-shopping-cart" className="RoutingLink">
                    <Button className="ProductDetails-CartButton GreenButtonContained" variant="contained"
                            endIcon={<AddShoppingCartIcon/>} onClick={this.AddToCart}>
                        Add to cart
                    </Button>
                </Link>
            </div>
        );
    }
}

export const ProductDetails = () => {
    //Resetting scrolling to top of the page
    window.scrollTo(0, 0);

    //Getting product name from URL
    const productId = useParams();

    //Getting product by id from URL
    const selectedProduct = TestData.products.find(product => parseInt(productId.productId.match("[^/]*")) === product.id)

    return (
        <Grid container className="ProductDetails-Container">
            <Link to="/" className="RoutingLink">
                <Button className="GreenButtonContained" variant="contained">
                    Return to products
                </Button>
            </Link>

            <Grid item container xs={12} className="ProductDetails-ItemContainer">
                <Grid item xs={12} md={6}>
                    <h1>{selectedProduct.name}</h1>
                    <div className="ProductDetails-ImageConatiner">
                        <img className="ProductDetails-Image" src={selectedProduct.image} alt={selectedProduct.name}/>
                    </div>

                    <Grid item container>
                        <Grid item xs={12} md={6}>
                            <h3>Brand</h3>
                            <p>{selectedProduct.brand}</p>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <h3>Seller</h3>
                            <p>{selectedProduct.seller}</p>
                        </Grid>
                    </Grid>
                    <h3>Description</h3>
                    <p>{selectedProduct.description}</p>
                </Grid>
                <Grid item md={1}/>
                <Grid item xs={12} sm={12} md={5}>
                    <Card className="ProductDetails-SelectionPanel">
                        <h3 className='TextGreen'>Price</h3>
                        <h4 className='TextPink'>{selectedProduct.price} Ɖ</h4>

                        <ProductButtons product={selectedProduct}/>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}