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
import { SearchBar } from '../Browse/Products/SearchBar';

export const ViewOrders = () => {
    const [cookie] = useCookies(['user']);

    let [searchFilter] = useState({searchQuery: ''});
    const [unfilteredOrders, setUnfilteredOrders] = useState(null);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const searchBarLabel = "Search Orders";

    useEffect(() => {
        axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/orders/' + (cookie.user.user.role === 'CUSTOMER' ? 'findByUser' : 'all'),
        {
            headers: {
                'Authorization': `Bearer ${cookie.user.token}`
            }
        }).then((res) => {
            setUnfilteredOrders(res.data);
            setOrders(res.data);
            setLoading(false);
        });
    }, []);

    // Filter orders when search query changes
    const filterOrders = () => {
        const orderNameQuery = new RegExp(`^(order #)?${searchFilter.searchQuery}`, 'i');
        const orderProductQuery = new RegExp(`^${searchFilter.searchQuery}`, 'i');

        setOrders(
            unfilteredOrders.filter(order =>
                // Filter by order name
                (`order #${order.id}`.search(orderNameQuery) > -1) ||
                (order.items.some(item => item.name.search(orderProductQuery) > -1))
            )
        );
    }

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
        const [expandedId, setExpandedId] = React.useState(-1);

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

        const handleExpandClick = (index) => {
            setExpandedId(expandedId === index ? -1 : index);
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

        // User has no orders
        if (!unfilteredOrders || !unfilteredOrders[0]) {
            return (
                <Grid container className="Cart-Container">
                    <Grid item container sx={{paddingBottom: '2rem'}}>
                        <Typography>
                            You currently have no orders.
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        // No orders found with search query
        if (!orders || !orders[0]) {
            return (
                <Grid container className="Cart-Container">
                    <Grid item container sx={{paddingBottom: '2rem'}}>
                        <Typography>
                            No orders found with current search query.
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        return orders.map((order, index) => {
            return (
                <Grid item key={index} xs={12} md={6} lg={4}>
                    <Card>
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
                                onClick={() => handleExpandClick(index)}
                                aria-expanded={expandedId === index}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
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
            <Grid container justifyContent="center">
                <Grid item xs={12} className="TextGreen" textAlign='center'>
                    <h1>My Orders</h1>
                </Grid>
                <Grid item container xs={12} justifyContent='center'>
                        <SearchBar filters={searchFilter} filterData={filterOrders} label={searchBarLabel} />
                    </Grid>
                <Grid item container xs={12} sm={10} spacing={4}>
                    <OrderItem  />
                </Grid>
            </Grid>
        </div>
    )
}
