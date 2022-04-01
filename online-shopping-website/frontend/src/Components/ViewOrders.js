import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useCookies } from 'react-cookie';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function ViewOrders() {
    const [cookie, setCookie] = useCookies(['user']);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const getOrders = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/orders/all').orderById(cookie.user.user.id);
    //     axios.all([getOrders]).then(
    //         axios.spread((resOrders) => {
    //             setOrders(resOrders.data);
    //             setLoading(false);
    //         })
    //     );
    // }, []);

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
    console.log(orders);

    return orders.map((order, index) => {
        return (
            <Box key={index} sx={{ flexGrow: 1, maxWidth: 752 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            My Orders
                        </Typography>
                        <Demo>
                            <List>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={"Order #" + order.id}
                                        secondary={order.createdAt}
                                    />
                                </ListItem>
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
                <Link to="/" className='RoutingLink'>
                    <Button variant="text" className="ProductsBackButton">
                        <ArrowBackIosNewIcon /><h4>Return to products</h4>
                    </Button>
                </Link>
            </Box>
        );
    })
}
