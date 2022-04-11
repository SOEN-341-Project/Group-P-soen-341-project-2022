import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import { ViewOrders } from './ViewOrders';
import { useCookies } from 'react-cookie';
import { borderRight } from '@mui/system';

export const AdminPage = () => {
    //making datagrid colums to see all users
    const columns = [
        {
            field: 'modify',
            headerName: 'Modify',
            width: '70',

            renderCell: (params) => (
                <Link to={{
                    pathname: `/profile`,
                    params: { params }
                }} className="RoutingLink">
                    <Button className="sellerButton GreenButtonText" variant="text">
                        <EditIcon />
                    </Button>
                </Link>
            ),
            sortable: false,
            filterable: false,
            hideable: false
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: '70',
            renderCell: (params) => (
                <Button className="sellerButton GreenButtonText" variant="text" onClick={() => removeUser(params.id)}>
                    <DeleteIcon />
                </Button>
            ),
            sortable: false,
            filterable: false,
            hideable: false
        },
        {
            field: 'user',
            headerName: 'Users',
            width: '1000',
            sortable: true,
        },
        // {
        //     field: 'username',
        //     headerName: 'Username',
        //     width: 200
        // },
        // {
        //     field: 'email',
        //     headerName: 'Email',
        //     width: 200
        // },
        // {
        //     field: 'role',
        //     headerName: 'Role',
        //     width: 200
        // }
    ]

    const [cookies, setCookies] = useCookies(['user']);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <h1 className="TextGreen LoadingSpinnerHeader">Loading Users</h1>
                    </Grid>
                    <Grid item xs={12} id="LoadingSpinner" />
                </Grid>
            );
        } else if (cookies.user.user.role === 'ADMIN') {
            axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/users/all')
                .then((resUser) => {
                    console.log(resUser.data);
                    setUsers(resUser.data);
                    setLoading(false);  
                });
        }
        }, []);

    const removeUser = (userId) => {
        const userToRemove = cookies.user.find(user => user.id === userId);
        if (window.confirm(`Delete user: "${userToRemove.name}" with id: ${userToRemove.id}?`)) {
            axios.delete(process.env.REACT_APP_DB_CONNECTION + '/api/users/delete?id=' + userId, {
                headers: {
                    'Authorization': `Bearer ${cookies.user.token}`
                }
            }).catch((err) => {
                window.alert(
                    err.response.data.error + ".\n" +
                    (err.response.data.message ? err.response.data.message + "." : ""));
            });
            window.location.reload();
        }
    }
    

    if(cookies.user.user.role === 'ADMIN'){
        return (
            <Grid className="sellerContainer">
                <Grid container className="adminTableContainer">
                    <Grid item xs={12}>
                        <h1 style={{ color: "white", marginTop: 0 }}>Browsing Users</h1>
                    </Grid>
                    <Grid item xs={12}>
                </Grid>

                <Grid item sm={12} className="sellerTable">
                    <div style={{ minHeight: '10.5rem', height: 400, width: '100%' }}>
                        <div style={{ display: 'flex', height: '100%' }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid
                                    rows={users}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        
            <Grid container className="adminTableContainer" >
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                </Grid>
                <Grid item sm={12} className="sellerTable">
                        <div style={{ minHeight: '10.5rem', height: 'auto', width: '100%' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>
                                   <ViewOrders />
                                </div>
                            </div>
                        </div>
                    </Grid>
            </Grid>
        </Grid>
        
    )}
    else{
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
