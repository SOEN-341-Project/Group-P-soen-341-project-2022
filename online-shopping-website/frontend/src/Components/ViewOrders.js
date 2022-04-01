import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'; import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
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

    const OrderItem = () => {
        const [expanded, setExpanded] = React.useState(false);

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };
        return orders.map((order, index) => {
            return (
                <Grid item sx={{ margin: "0.5rem auto" }} xs={12}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            title={'Order #' + order.id}
                            // subheader={"Total: " + order.totalPrice.toFixed(2) + ' Ɖ'}
                            subheader={'Created at:' + order.createdAt}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Order placed at: {order.createdAt}
                                {/* Last modified: {order.updatedAt} */}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Typography>Details</Typography>
                            <ExpandMore
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
                                <Typography paragraph>Details:</Typography>
                                <Typography paragraph>
                                    {/* {order.products[0].name} */}
                                </Typography>
                                <Typography paragraph>
                                    (quantity) ProductName Price
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>

            )
        })
    }

    console.log(orders);
    return (
        <Grid container>
            <Grid item xs={12} className="TextGreen" sx={{ textAlign: 'center' }}>
                <h1>My Orders</h1>
            </Grid>
            <OrderItem />
            <Grid xs={12}>
                <Link to="/" className='RoutingLink'>
                    <Button variant="text" className="ProductsBackButton">
                        <ArrowBackIosNewIcon /><h4>Return to products</h4>
                    </Button>
                </Link>
            </Grid>

        </Grid>

    )
}


