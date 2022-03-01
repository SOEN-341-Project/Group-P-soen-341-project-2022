import Grid from '@mui/material/Grid';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const CartPage = (props) => {
    const [alertVisible, setAlertVisible] = React.useState(false);

    const [GST, setGST] = React.useState(0.00);
    const [QST, setQST] = React.useState(0.00);

    function calculateSubtotal() {
        const subtotal = 0;
        return subtotal;
    }

    function calculateTotal() {
        const total = 0;
        return total;
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
                            onClick={() => {
                                setAlertVisible(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Order has successfully been placed.
                </Alert>
            </Collapse>
            <Grid item xs={12} sx={{ paddingBottom: '1rem' }}>
                <h1 className='TextPink'>My Shopping Cart</h1>
            </Grid>
            <Grid item conatiner xs={12} lg={9} className="CartItemsContainer">
                <ItemPreview cart={props.cart} />
            </Grid>
            <Grid item xs={3} className="Cart-SideBanner">
                <Grid item xs={12}>
                    <h3 className='TextGreen'>Subtotal</h3>
                </Grid>
                <Grid item xs={12}>
                    <h4 className='TextPink'>GST: 5.0%</h4>
                    <p>{GST.toFixed(2)} Ɖ</p>
                </Grid>
                <Grid item xs={12}>
                    <h4 className='TextPink'>QST: 9.975%</h4>
                    <p>{QST.toFixed(2)} Ɖ</p>
                </Grid>
                <Grid item xs={12}>
                    <h3 className='TextGreen'>Total</h3>
                    <p>{calculateTotal().toFixed(2)} Ɖ</p>
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
                        <ArrowBackIosNewIcon /><h4>Return to products</h4>
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );

}

const ItemPreview = (props) => {

    // missing logic for removing item from user cart
    function removeItem(item) {
        // props.cart = props.cart.filter((itemToRemove => item.id !== itemToRemove.id));
        console.log("remove item clicked");
    }

    return (
        props.cart.map((item) => {
            return (
                <Grid container className="CartItem">
                    <Grid item  md={2} sx={{ position: 'relative' }}>
                        <img className="CartItemImage" src={item.image} alt={item.name} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12} lg={12} sx={{ display: 'flex' }}>
                            <Grid item xs={9} md={11}>
                                <h3 style={{ margin: '1rem 0' }}>{item.name}</h3>
                            </Grid>
                            <Grid item xs={3} md={1} sx={{ margin: 'auto', textAlign: 'center' }}>
                                <Button className="Cart-CloseButton" onClick={removeItem(item)}>
                                    <CloseIcon />
                                </Button>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} className='CartText'>
                            <Grid item xs={12} lg={3}>
                                <h4 style={{ margin: 0 }}>Seller:</h4>
                                <p style={{ margin: '0.5rem 0' }}>{item.seller}</p>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <h4 style={{ margin: 0 }}>Brand:</h4>
                                <p style={{ margin: '0.5rem 0' }}>{item.brand}</p>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <h4 style={{ margin: 0 }}>Price: {item.price} Ɖ</h4>
                                <h4>Promotion: 20% off</h4>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <QuantityButtons item={item} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        })
    )
}


class QuantityButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: props.item.quantity,
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
            this.setState({ quantity: this.state.quantity - 1 });
        }
    }

    //Need to update database too
    UpdateValue = (e) => {
        const inputValue = Number(e.target.value);

        if ((inputValue < 1) || (inputValue.isNaN)) {
            this.setState({ quantity: 1 });
        } else if (inputValue > 10) {
            this.setState({ quantity: 10 });
        } else {
            this.setState({ quantity: inputValue });
        }
    }

    render() {
        return (
            <div>
                <h4 className="Cart-Quantity">Quantity</h4>
                <Stack className="Cart-Quantity" direction="row" spacing={1}>
                    <Button className="QuantityButtons-Shared PinkButtonContained" variant="contained"
                        disabled={this.state.quantity === 1}
                        onClick={this.DecreaseItem}>
                        <RemoveIcon />
                    </Button>
                    <input className="inputne" disabled={true} value={this.state.quantity} onChange={this.UpdateValue} />
                    <Button className="QuantityButtons-Shared PinkButtonContained" variant="contained"
                        disabled={this.state.quantity === 10}
                        onClick={this.IncrementItem}>
                        <AddIcon />
                    </Button>
                </Stack>
            </div>
        );
    }
}