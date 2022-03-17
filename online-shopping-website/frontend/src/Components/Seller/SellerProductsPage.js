import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const columns = [
    {
        field: 'modify',
        headerName: 'Modify',
        renderCell: (params) => (
            <Link to={{
                pathname: `/seller/${params.id}`,
                params: { params }
            }} className="RoutingLink">
                <Button className="sellerButton" variant="text">
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
        renderCell: (params) => (
            <Button className="sellerButton" variant="text" onClick={() => removeProduct(params.id)}>
                <DeleteIcon />
            </Button>
        ),
        sortable: false,
        filterable: false,
        hideable: false
    },
    { field: 'id', headerName: 'ID', type: 'number', width: 20, align: 'center', },
    {
        field: 'picture',
        headerName: 'Image',
        align: 'center',
        width: 70,
        renderCell: (params) => (
            <img className="sellerImage" src={params.value} alt="n/a" />
        ),
        sortable: false,
        filterable: false
    },
    { field: 'name', headerName: 'Product name', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'brand', headerName: 'Brand', width: 200 },
    {
        field: 'price', headerName: 'Price', type: 'number', width: 100,
        valueGetter: (params) =>
            `${params.value.toFixed(2) || ''} Ɖ`,
    },
    { field: 'totalQuantity', headerName: 'Quantity', type: 'number', width: 100 }
];

export const SellerProductsPage = () => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [sellerProducts, setSellerProducts] = useState(null);

    useEffect(() => {
        // Get sellers
        // TODO Remove this after seller login ready
        const getSellers = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/users/sellers');
        const getSellerProducts = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/items/findall?sellerId=' + selectedSeller);
        axios.all([getSellers, getSellerProducts]).then(
            axios.spread((resSellers, resSellerProducts) => {
                setSellers(resSellers.data);
                setSellerProducts(resSellerProducts.data);
                console.log(resSellerProducts.data);
                setLoading(false);
            })
        );
    }, [selectedSeller]);
    
    if (loading) {
        return <h1>Loading Sellers...</h1>;
    }
    
    const handleSellerClick = (event) => {
        console.log(event.target.id);
        setSelectedSeller(event.target.id);
    }
    
    const RenderSellerButtons = () => {
        return (
            sellers.map((seller, index) => {
                return <Button key={index} id={seller.id} variant="outlined" onClick={(e) => handleSellerClick(e)}>{seller.sellerName}</Button>;
            })
        );
    }
    
    return (
        <Grid container className="sellerContainer">
            <Grid item>
                {RenderSellerButtons()}
            </Grid>
            <Grid item xs={12} className="sellerButtonsContainer">
                <Link to="/seller/add-product-form" className="RoutingLink">
                    <Button variant="contained">
                        Add product <AddIcon />
                    </Button>
                </Link>
            </Grid>
                <Grid item sm={12} className="sellerTable">
                    <div style={{ minHeight: '10.5rem', height: 400, width: '100%' }}>
                        <div style={{ display: 'flex', height: '100%' }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid
                                    rows={sellerProducts}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
        </Grid>
    );
}

// needs to access database to modify values somehow
function removeProduct(productId) {
    if(window.confirm(`Delete product with id ${productId}?`)) {
        axios.delete(process.env.REACT_APP_DB_CONNECTION + '/api/items/delete?id=' + productId).then((res) => {
            window.location.reload();
            console.log(productId);
        });
    }
}