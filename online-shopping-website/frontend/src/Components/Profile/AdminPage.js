import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import axios from 'axios';
import { ViewOrders } from './ViewOrders';
import { useCookies } from 'react-cookie';
import { borderRight } from '@mui/system';

export const AdminPage = () => {
    //making datagrid colums to see all users
    const columns = [
        {
            field: 'delete',
            headerName: 'Delete',
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
            field: 'id',
            headerName: 'User ID',
        },
        {
            field: 'active',
            headerName: 'Activity',
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
        }

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
                console.log(resUser.data);
                setUsers(resUser.data);
                setLoading(false);  
            });
        }
    }, []);

    const removeUser = async (id) => {
        if (window.confirm(`Delete user with id: ${id}?`)) {
            const deleteRes = await axios.delete(process.env.REACT_APP_DB_CONNECTION + '/api/users/delete?id=' + id, {
                "headers" : {
                    "Authorization": `Bearer ${cookies.user.token}`
                }
            })
            console.log(deleteRes);
            console.log(deleteRes.data);
            window.location.reload();
        }
    }
    
    if (loading) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1 className="TextGreen LoadingSpinnerHeader">Loading Users</h1>
                </Grid>
                <Grid item xs={12} id="LoadingSpinner" />
            </Grid>
        );
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
                    <div style={{ minHeight: '10.5rem', height: 370, width: '100%' }}>
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
