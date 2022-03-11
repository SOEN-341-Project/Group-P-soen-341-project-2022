import Grid from '@mui/material/Grid';
import * as React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TestData from '../TestValues.json';
import {useState} from "react";

export const CartPage = () => {
    // const [cart, setCart] = useState(TestData.cart);
    const [GST, setGST] = useState(0.00);
    const [QST, setQST] = useState(0.00);
    const [alertVisible, setAlertVisible] = useState(false);
    const [subtotal, setSubtotal] = useState(0.00);
    const [total, setTotal] = useState(0.00);

    let [cart] = useState(TestData.cart);

    const calculateSubtotal = () => {
        let subtotalCalc = 0;

        cart.forEach((item) => {
            subtotalCalc += ((item.quantity) * (item.price));
        });
        setSubtotal(subtotalCalc);

        return subtotal;
    }


    const calculateTotal = () => {
        setTotal(subtotal + GST + QST);
        return total.toFixed(2);
    }

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
            <Grid item conatiner xs={12} lg={9} className="CartItemsContainer">
                <CartItem cart={cart} setCart={setCart}/>
            </Grid>
            <Grid item xs={3} className="Cart-SideBanner">
                <Grid item xs={12}>
                    <h3 className='TextGreen'>Subtotal</h3>
                    <PriceBreakdown cart={cart}/>
                    <hr/>
                    <h4 style={{margin: '1rem 0', textAlign: 'right'}}
                        className='TextGreen'> {subtotal} Ɖ
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
                        <h5 style={{marginTop: 0, textAlign: 'right'}}>{GST} Ɖ</h5>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', marginTop: 0}}>
                    <Grid item xs={6}>
                        <h5 style={{margin: 0}}>QST: 9.975%</h5>
                    </Grid>
                    <Grid item xs={6}>
                        <h5 style={{marginTop: 0, textAlign: 'right'}}>{QST} Ɖ</h5>
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
                        className='TextPink'>{subtotal + GST + QST} Ɖ</h4>
                </Grid>
                <Grid item xs={12} className="Cart-OrderButton">
                    <Button variant="contained" className="GreenButtonContained" onClick={function () {
                        setAlertVisible(true);
                        window.scrollTo(0, 0);
                    }}>
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

const PriceBreakdown = (props) => {
    return (
        props.cart.map((item, index) => {
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

const CartItem = (cart, setCart) => {

    function IncrementItem(item) {
        if (item.quantity !== 10) {
            let tempCart = cart.cart;
            tempCart[item.id].quantity++;
            setCart(tempCart);
        }
    }

    function DecreaseItem(item) {
        if (item.quantity !== 1) {
            let tempCart = cart.cart;
            tempCart[item.id].quantity--;
            setCart(tempCart);
        }
    }

    function RemoveItem(item) {
        let tempCart = cart.cart;
        tempCart = tempCart.splice(item.id, item.id);
        setCart(tempCart);
    }

    // console.log(cart.cart[0]);

    return (
        cart.cart.map((item) => {
                console.log(item);
                return (
                    <Grid container className="CartItem">
                        <Grid item sm={1} md={2} sx={{position: 'relative'}}>
                            <img className="CartItemImage" src={item.image} alt={item.name}/>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Grid item xs={12} lg={12} sx={{display: 'flex'}}>
                                <Grid item sm={9} md={11}>
                                    <h3 style={{margin: '1rem 0'}}>{item.name}</h3>
                                </Grid>
                                <Grid item xs={3} md={1} sx={{margin: 'auto', textAlign: 'center'}}>
                                    <Button className="Cart-CloseButton" onClick={RemoveItem(item)}>
                                        <CloseIcon/>
                                    </Button>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} className='CartText'>
                                <Grid item xs={12} lg={3}>
                                    <h4 style={{margin: 0}}>Seller:</h4>
                                    <p style={{margin: '0.5rem 0'}}>{item.seller}</p>
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <h4 style={{margin: 0}}>Brand:</h4>
                                    <p style={{margin: '0.5rem 0'}}>{item.brand}</p>
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <h4 style={{margin: 0}}>Price: {item.price} Ɖ</h4>
                                    <h4>Promotion: 20% off</h4>
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <div>
                                        <h4 className="Cart-Quantity">Quantity</h4>
                                        <Stack className="Cart-Quantity" direction="row" spacing={1}>
                                            <Button className="QuantityButtons-Shared PinkButtonContained"
                                                    variant="contained"
                                                    disabled={item.quantity === 1}
                                                    onClick={DecreaseItem(item)}>
                                                <RemoveIcon/>
                                            </Button>
                                            <input className="inputne" disabled={true} value={item.quantity}/>
                                            <Button className="QuantityButtons-Shared PinkButtonContained"
                                                    variant="contained"
                                                    disabled={item.item.quantity === 10}
                                                    onClick={IncrementItem(item)}>
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
