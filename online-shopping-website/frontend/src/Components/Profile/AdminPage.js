import './../Seller/SellerProductsPage.css';
import './AdminPage.css';

import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Typography} from '@mui/material';
import axios from 'axios';
import {ViewOrders} from './ViewOrders';
import {LoadingSpinner} from './../LoadingSpinner'
import {useCookies} from 'react-cookie';

export const AdminPage = () => {
    //making datagrid colums to see all users
    const columns = [
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: (params) => (
                <Button className="sellerButton GreenButtonText" variant="text" onClick={() => removeUser(params.id)}>
                    <DeleteIcon/>
                </Button>
            ),
            sortable: false,
            filterable: false,
            hideable: false
        },
        {
            field: 'id',
            headerName: 'User ID',
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
        },
        {
            field: 'username',
            headerName: 'Username',
        },
        {
            field: 'role',
            headerName: 'Role',
        },
        {
            field: 'active',
            headerName: 'Active',
        },
    ]

    const [cookies, setCookies] = useCookies(['user']);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cookies.user.user.role === 'ADMIN') {
            axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/users/all', {
                "headers": {
                    "Authorization": `Bearer ${cookies.user.token}`
                }
            })
                .then((resUser) => {
                    setUsers(resUser.data);
                    setLoading(false);
                });
        }
    }, []);

    const removeUser = async (id) => {
        if (window.confirm(`Delete user with id: ${id}?`)) {
            try {
                await axios.delete(process.env.REACT_APP_DB_CONNECTION + '/api/users/delete?id=' + id, {
                    "headers": {
                        "Authorization": `Bearer ${cookies.user.token}`
                    }
                });
            } catch (err) {
                window.alert(
                    err.response.data.error + ".\n" +
                    (err.response.data.message ? err.response.data.message + "." : ""));
            }
            window.location.reload();
        }
    }

    if (loading) {
        return (
            <LoadingSpinner loadText={"Loading Users"}/>
        );
    }

    if (cookies.user.user.role === 'ADMIN') {
        return (
            <Grid className="sellerContainer">
                <Grid container className="adminTableContainer">
                    <Grid item>
                        <h1 style={{color: "white", marginTop: 0}}>Browsing Users</h1>
                    </Grid>
                    <Grid item sx={{minHeight: '10.5rem', height: 370, width: '100%'}} className="sellerTable">
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Grid>
                </Grid>

                <Grid container className="adminTableContainer">
                    <Grid item sx={{padding: '2rem'}} className="sellerTable">
                        <ViewOrders/>
                    </Grid>
                </Grid>
            </Grid>

        )
    } else {
        return (
            <Grid container className="Cart-Container">
                <Grid item container sx={{paddingBottom: '2rem'}}>
                    <Typography>
                        You do not have permission to access this page.
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}
