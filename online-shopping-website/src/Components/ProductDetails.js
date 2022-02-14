import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useParams} from 'react-router-dom';
import Products from '../TestValues.json';

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

    get quantity() {
        return this.state.quantity;
    }

    render() {
        return (
            <div>
                <h4>Quantity</h4>
                <Stack className="ProductDetails-QuantityButtonsContainer" direction="row" spacing={1}>
                    <Button className="ProductDetails-QuantityButtons" variant="contained"
                            disabled={this.state.quantity == 10}
                            onClick={this.IncrementItem}>
                        <AddIcon/>
                    </Button>
                    <input className="inputne" value={this.state.quantity} onChange={this.UpdateValue}/>
                    <Button className="ProductDetails-QuantityButtons" variant="contained"
                            disabled={this.state.quantity == 1}
                            onClick={this.DecreaseItem}>
                        <RemoveIcon/>
                    </Button>
                </Stack>
                <h5 className="ProductDetails-ProductLimitText">Limit of 10 items per product in cart.</h5>
                <Button  className="ProductDetails-CartButton"variant="contained" endIcon={<AddShoppingCartIcon/>}>
                    Add to cart
                </Button>
            </div>
        );
    }
}

export const ProductDetails = () => {
    const productName = useParams();

    const selectedProduct = {
        brand: "",
        description: "",
        id: null,
        image: "",
        name: "",
        price: null,
        seller: ""
    }

    Products.products.map(product => {
        if (productName.productName === product.name) {
            selectedProduct.brand = product.brand;
            selectedProduct.description = product.description;
            selectedProduct.id = product.id;
            selectedProduct.image = product.image;
            selectedProduct.name = product.name;
            selectedProduct.price = product.price.toFixed(2);
            selectedProduct.seller = product.seller;
        }
    });

    return (
        <Grid container className="ProductContainer">
            <Grid item xs={12} sm={9} lg={6}>
                <h1>{selectedProduct.name}</h1>
                <img className="ProductDetails-Image" src={selectedProduct.image} alt={selectedProduct.name}/>

                <h4>Brand:</h4>
                <p>{selectedProduct.brand}</p>

                <h4>Seller:</h4>
                <p>{selectedProduct.seller}</p>

                <h4>Description:</h4>
                <p>{selectedProduct.description}</p>
            </Grid>

            <Grid item className="ProductDetails-SelectionPanel" xs={12} sm={3} lg={6}>
                <Card>
                    <h4>Unit Price:</h4>
                    <p>{selectedProduct.price} Ɖ</p>

                    <ProductButtons product={selectedProduct}/>
                </Card>
            </Grid>
        </Grid>
    );
}