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
    let [cart] = useState(TestData.cart);
    let [subtotal] = useState(0.00);
    let [GST] = useState(0.00);
    let [QST] = useState(0.00);
    let [total] = useState(0.00);
    const [alertVisible, setAlertVisible] = useState(false);

    const calculateSubtotal = () => {
        console.log("entered subtotal fn");
        cart.forEach((item) => {
            subtotal += ((item.quantity) * (item.price));
        });
    }

    const calculateGST = () => {
        GST = subtotal * 0.05;
    }

    const calculateQST = () => {
        QST = subtotal * 0.0975;
    }

    const calculateTotal = () => {
        total = subtotal + GST + QST;
    }

    calculateSubtotal();
    calculateGST();
    calculateQST();
    calculateTotal();

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
                <CartItem cart={cart}/>
            </Grid>
            <Grid item xs={3} className="Cart-SideBanner">
                <Grid item xs={12}>
                    <h3 className='TextGreen'>Subtotal</h3>
                    <PriceBreakdown cart={cart}/>
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

const CartItem = (props) => {

    function IncrementItem(item) {
        if (item.quantity !== 10) {
            // console.log("quantity before:" + props.cart[item.id].quantity);
            props.cart[item.id].quantity++;
            // console.log("quantity after:" + props.cart[item.id].quantity);

        }
    }

    function DecreaseItem(item) {
        if (item.quantity !== 1) {
            // console.log("quantity before:" + props.cart[item.id].quantity);
            props.cart[item.id].quantity--;
            // console.log("quantity after:" + props.cart[item.id].quantity);

        }
    }

    function RemoveItem(item) {
        props.cart.splice(item.id, item.id);
    }

    return (
        props.cart.map((item, index) => {
                return (
                    <Grid container className="CartItem" key={index}>
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
                                                    disabled={item.quantity === 10}
                                                    onClick={() => IncrementItem(item)}>
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
