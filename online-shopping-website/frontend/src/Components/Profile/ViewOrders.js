import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useCookies } from 'react-cookie';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ViewOrders() {
    const [cookie, setCookie] = useCookies(['user']);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/orders/findByUser',
            {
                headers: {
                    'Authorization': `Bearer ${cookie.user.token}`
                }
            }).then((res) => {
                setOrders(res.data);
                setLoading(false);
            });
    }, []);

    // Waiting for orders during GET
    if (loading) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1 className="TextGreen LoadingSpinnerHeader">Loading orders</h1>
                </Grid>
                <Grid item xs={12} id="LoadingSpinner" />
            </Grid>);
    }

    const OrderItem = () => {
        const [expanded, setExpanded] = React.useState(false);

        const ExpandMore = styled((props) => {
            const { expand, ...other } = props;
            return <IconButton {...other} />;
        })(({ theme, expand }) => ({
            transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        }));

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };

        //Returns total item quantity
        const calculateTotalItems = (props) => {
            let totalQty = 0;
            props.itemQuantities.forEach(itemQty => totalQty += itemQty)
            return totalQty;
        }

        const ProductBreakdown = (props) => {
            return props.order.items.map((item, index) => {
                return (
                    <Grid key={index} sx={{ margin: '0 0 0.7rem 1rem' }}>
                        <Typography variant="body1" color="text.primary">
                            {item.name[0].toUpperCase()}{item.name.substring(1)} (x{props.order.itemQuantities[index]})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Unit price: {item.price}Ɖ
                        </Typography>
                    </Grid>
                );
            })
        }

        return orders.map((order, index) => {
            return (
                <Grid item key={index} margin="1rem">
                    <Card style={{ maxWidth: '345' }}>
                        <CardHeader
                            title={'Order #' + order.id}
                            subheader={"Order date: " + order.createdAt.substring(0, 10)}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Order created at: [{order.createdAt.substring(11, 22)}]
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last modified: {order.updatedAt.substring(0, 10)} [{order.updatedAt.substring(11, 22)}]
                            </Typography>
                            <br />
                            <Typography variant="body2" color="text.primary">
                                Total paid: {order.totalPrice.toFixed(2)}Ɖ
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Quantity: {calculateTotalItems(order)} items
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Typography style={{ paddingLeft: '0.5rem' }}>View more</Typography>
                            <ExpandMore key={index}
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph style={{ textDecoration: 'underline' }}>
                                    Order summary
                                </Typography>
                                <ProductBreakdown order={order} />
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            )
        })
    }

    return (
        <div>
            <Link to="/" className='RoutingLink'>
                <Button variant="text" className="ProductsBackButton">
                    <ArrowBackIosNewIcon /><h4>Return to products</h4>
                </Button>
            </Link>
            <Grid container
            >
                <Grid item xs={12} className="TextGreen" textAlign='center'>
                    <h1>My Orders</h1>
                </Grid>
                <Grid item container xs={12} sm={8} md={6} lg={8} margin='auto'
                    justifyContent='center'>
                    <OrderItem />
                </Grid>
            </Grid>
        </div>
    )
}
