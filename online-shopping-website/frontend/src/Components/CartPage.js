import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import {Link, useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TestData from '../TestValues.json';
import { useCookies } from "react-cookie";

export const CartPage = (props) => {
    //Forces rerender of components on call
    const [state, setState] = useState(0);
    const forceUpdate = () => setState(state + 1);

    const [cartCookie, setCookie] = useCookies(["cart"]);
    //TODO: Replace TestData.cart with cookies value
    let cart = props.cartItems;

    let [subtotal] = useState(0.00);
    let [GST] = useState(0.00);
    let [QST] = useState(0.00);
    let [total] = useState(0.00);
    const [alertVisible, setAlertVisible] = useState(false);

    const getCartFromCookies = () =>{
        if (cartCookie.cart) {
            return cartCookie.cart.map(item =>{
                let itemData = TestData.products.find(product => product.id === item.id);
                return {
                    id: itemData.id,
                    name: itemData.name,
                    image: itemData.image,
                    description: itemData.description,
                    seller: itemData.seller,
                    brand: itemData.brand,
                    price: itemData.price,
                    quantity: item.quantity
                }
            });
        }
    }

    useEffect(() => {
        cart = getCartFromCookies();
    })

    const calculateCartTally = () => {
        //calculating subtotal of all items
        cart.forEach((item) => {
            subtotal += ((item.quantity) * (item.price));
        });

        //calculating taxes
        GST = subtotal * 0.05;
        QST = subtotal * 0.0975;

        //calculating total after tax
        total = subtotal + GST + QST;
    }
   
    
    if(!cart){
        return (
            <h1>Cart empty</h1>
        );
    }
    else{
        calculateCartTally();
    }

    const PlaceOrder = () => {
        //Opening order placement alert
        setAlertVisible(true);
        window.scrollTo(0, 0);

        //Posting order to backend once place order has been clicked
        axios.post(process.env.REACT_APP_DB_CONNECTION + '/api/orders/create', {
            //TODO: replace with cookie values
            userId: 3,
            itemIds: [5, 8, 14],
            itemQuantities: [2, 5, 3],
            totalPrice: total
        }).then(function (response) {
            console.log("Order added to backend.")
        }).catch(function (error) {
            console.log("Order addition to backend failed.");
        });

        //Clearing cart
        cart = [];    //TODO: replace with delete cart cookie (on alert open)
        forceUpdate();
    }

    //Displays cart items breakdown
    const PriceBreakdown = () => {
        return (
            cart.map((item, index) => {
                return (
                    <Grid item xs={12} sx={{display: 'flex'}} key={index}>
                        <Grid item xs={6} sx={{overflowX: 'hidden'}}>
                            <p><em>{item.name}</em></p>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'right'}}>
                            <p>{item.quantity} x {item.price.toFixed(2)} Ɖ</p>
                        </Grid>
                    </Grid>
                );
            })
        )
    }

    const CartItem = () => {
        //instantiating navigation call
        let navigate = useNavigate();

        function IncrementItem(itemID) {
            //Increment quantity, ensuring that quantity does not exceed maximum 10 items per product in the cart
            if (cart[itemID].quantity !== 10) {
                cart[itemID].quantity++;
            }
            forceUpdate();
        }

        function DecreaseItem(itemID) {
            //Decrement quantity, ensuring that quantity has at least 1 item per product in the cart
            if (cart[itemID].quantity !== 1) {
                cart[itemID].quantity--;
            }
            forceUpdate();
        }

        function RemoveItem(itemID) {
            //Creates new array containing every product in the cart except the one being removed
            let updatedCart = cart.filter((item) => item.id !== itemID);

            //Reassigns all values of cart array except last index with updatedCart values
            for (let i = 0; i < updatedCart.length; i++) {
                cart[i] = updatedCart[i];
            }

            //Removes element at last index of cart
            cart.pop();
            forceUpdate();

            //Show alert and navigate back to home when cart is empty
            if (cart.length === 0) {
                window.alert("Cart emptied. Returning to home page.");
                navigate(`/`);
            }
        }

        return (
            cart.map((item, index) => {
                    return (
                        <Grid container className="CartItem" key={index}>
                            {/*Item image*/}
                            <Grid item sm={1} md={2} sx={{position: 'relative'}}>
                                <img className="CartItemImage" src={item.image} alt={item.name}/>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Grid item xs={12} lg={12} sx={{display: 'flex'}}>
                                    {/*Item Name*/}
                                    <Grid item sm={9} md={11}>
                                        <h3 style={{margin: '1rem 0'}}>{item.name}</h3>
                                    </Grid>

                                    {/*Remove item button*/}
                                    <Grid item xs={3} md={1} sx={{margin: 'auto', textAlign: 'center'}}>
                                        <Button className="Cart-CloseButton"
                                                onClick={() => RemoveItem(index)}>
                                            <CloseIcon/>
                                        </Button>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} className='CartText'>

                                    {/*Seller info*/}
                                    <Grid item xs={12} lg={3}>
                                        <h4 style={{margin: 0}}>Seller:</h4>
                                        <p style={{margin: '0.5rem 0'}}>{item.seller}</p>
                                    </Grid>

                                    {/*Brand info*/}
                                    <Grid item xs={12} lg={3}>
                                        <h4 style={{margin: 0}}>Brand:</h4>
                                        <p style={{margin: '0.5rem 0'}}>{item.brand}</p>
                                    </Grid>

                                    {/*Price info*/}
                                    <Grid item xs={12} lg={3}>
                                        <h4 style={{margin: 0}}>Price: {item.price} Ɖ</h4>
                                        <h4>Promotion: 20% off</h4>
                                    </Grid>

                                    {/*Quantity buttons*/}
                                    <Grid item xs={12} lg={3}>
                                        <div>
                                            <h4 className="Cart-Quantity">Quantity</h4>
                                            <Stack className="Cart-Quantity" direction="row" spacing={1}>
                                                <Button className="QuantityButtons-Shared PinkButtonContained"
                                                        variant="contained"
                                                        disabled={item.quantity === 1}
                                                        onClick={() => DecreaseItem(index)}>
                                                    <RemoveIcon/>
                                                </Button>
                                                <input className="inputne" disabled={true}
                                                       value={item.quantity}/>
                                                <Button className="QuantityButtons-Shared PinkButtonContained"
                                                        variant="contained"
                                                        disabled={item.quantity === 10}
                                                        onClick={() => IncrementItem(index)}>
                                                    <AddIcon/>
                                                </Button>
                                            </Stack>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                }
            )
        )
    }

    calculateCartTally();

    //When cart is empty display message
    if (cart == false) {
        return (
            <Grid container className="Cart-Container">
                <Collapse in={alertVisible} className="Cart-Alert">
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={function () {
                                    setAlertVisible(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        Order has successfully been placed.
                    </Alert>
                </Collapse>
                <Grid item xs={12} sx={{paddingBottom: '1rem'}}>
                    <h1 className='TextPink'>My Shopping Cart</h1>
                </Grid>
                <Grid item container sx={{paddingBottom: '2rem'}}>
                    <Typography>
                        Cart is empty. Return to products page to add products to cart.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/" className='RoutingLink'>
                        <Button variant="text" className="Cart-ProductsBackButton">
                            <ArrowBackIosNewIcon/><h4>Return to products</h4>
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        )
    }

    //When cart is full, display cart items
    return (
        <Grid container className="Cart-Container">
            <Collapse in={alertVisible} className="Cart-Alert">
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={function () {
                                setAlertVisible(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    sx={{mb: 2}}
                >
                    Order has successfully been placed.
                </Alert>
            </Collapse>
            <Grid item xs={12} sx={{paddingBottom: '1rem'}}>
                <h1 className='TextPink'>My Shopping Cart</h1>
            </Grid>
            <Grid item container xs={12} lg={9} className="CartItemsContainer">
                <CartItem/>
            </Grid>
            <Grid item xs={3} className="Cart-SideBanner">
                <Grid item xs={12}>
                    <h3 className='TextGreen'>Subtotal</h3>
                    <PriceBreakdown/>
                    <hr/>
                    <h4 style={{margin: '1rem 0', textAlign: 'right'}}
                        className='TextGreen'> {subtotal.toFixed(2)} Ɖ
                    </h4>
                </Grid>
                <hr/>
                <Grid item xs={12}>
                    <h3 className='TextGreen'>Total</h3>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', marginTop: '2rem'}}>
                    <Grid item xs={6}>
                        <h5 style={{margin: 0}}>GST: 5.0%</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <h5 style={{marginTop: 0, textAlign: 'right'}}>{GST.toFixed(2)} Ɖ</h5>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', marginTop: 0}}>
                    <Grid item xs={6}>
                        <h5 style={{margin: 0}}>QST: 9.975%</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <h5 style={{marginTop: 0, textAlign: 'right'}}>{QST.toFixed(2)} Ɖ</h5>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', marginTop: 0}}>
                    <Grid item xs={6}>
                        <h5 style={{margin: 0}}>Shipping</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <h5 style={{marginTop: 0, textAlign: 'right'}} className='TextGreen'><em>Free</em></h5>
                    </Grid>
                </Grid>
                <hr/>
                <Grid item xs={12}>
                    <h4 style={{margin: 0, textAlign: 'right'}}
                        className='TextPink'>{total.toFixed(2)} Ɖ</h4>
                </Grid>
                <Grid item xs={12} className="Cart-OrderButton">
                    <Button variant="contained" className="GreenButtonContained" onClick={PlaceOrder}
                            disabled={cart.length === 0}>
                        Place order
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Link to="/" className='RoutingLink'>
                    <Button variant="text" className="Cart-ProductsBackButton">
                        <ArrowBackIosNewIcon/><h4>Return to products</h4>
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}


