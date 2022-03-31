import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const Demo = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function ViewOrders() {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/orders/all');

        axios.all([getOrders]).then(
            axios.spread((resOrders) => {
                setOrders(resOrders.data);
                setLoading(false);
            })
        );
    }, []);

    // Waiting for orders during GET
    if (loading) {
        return <h1 className="TextGreen">Loading orders...</h1>;
    }

    return orders.products.map(order => {
        return (
            <Box sx={{flexGrow: 1, maxWidth: 752}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                            My Orders
                        </Typography>
                        <Demo>
                            <List>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={"Order #" + order.id}
                                        secondary={order.createdAt}
                                    />
                                </ListItem>,
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>
        );
    }
)
}
