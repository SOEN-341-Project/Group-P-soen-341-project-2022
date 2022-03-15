import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TestData from '../../TestValues.json';


const ProductButtons = (props) => {
    //TODO: Replace TestData.cart with cookies value
    let [cart] = useState(TestData.cart);

    const [quantity, setQuantity] = useState(1);
    let navigate = useNavigate();

    const [state, setState] = useState(0);
    const forceUpdate = () => setState(state + 1);

    const IncrementItem = () => {
        if (quantity !== 10) {
            setQuantity(quantity + 1);
        }
        forceUpdate();
    }
    const DecreaseItem = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
        forceUpdate();
    }

    const AddToCart = () => {
        let item = props.product;

        if (cart.find(product => item.id === product.id)) {
            if (window.confirm("Item is already in shopping cart. Navigate to cart to modify order quantity.")) {
                navigate('/my-shopping-cart')
            }
        } else {
            const newCartItem = {
                id: item.id,
                name: item.name,
                image: item.image,
                description: item.description,
                seller: item.seller,
                brand: item.brand,
                price: item.quantity,
                quantity: quantity
            }
            cart.push(newCartItem);
            window.alert("Item(s) successfully added to cart.");
        }
        console.log(cart);
    }

    return (
        <div className="ProductDetails-QuantityButtonsContainer">
            <h3 className='TextGreen'>Quantity</h3>
            <Stack className="ProductDetails-QuantityButtonsStack" direction="row" spacing={1}>
                <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                        disabled={quantity === 1}
                        onClick={DecreaseItem}>
                    <RemoveIcon/>
                </Button>
                <input className="inputne" disabled={true} value={quantity}/>
                <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                        disabled={quantity === 10}
                        onClick={IncrementItem}>
                    <AddIcon/>
                </Button>
            </Stack>
            <h5 className="ProductDetails-ProductLimitText">Limit of 10 items per product in cart.</h5>
            <Button className="ProductDetails-CartButton GreenButtonContained" variant="contained"
                    endIcon={<AddShoppingCartIcon/>} onClick={AddToCart}>
                Add to cart
            </Button>
        </div>
    );

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