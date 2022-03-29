import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const SellerProductsPage = () => {
    // DataGrid columns
    const columns = [
        {
            field: 'modify',
            headerName: 'Modify',
            renderCell: (params) => (
                <Link to={{
                    pathname: `/seller/${params.id}`,
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
            renderCell: (params) => (
                <Button className="sellerButton GreenButtonText" variant="text" onClick={() => removeProduct(params.id)}>
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
        { field: 'brandName', headerName: 'Brand', width: 200 },
        {
            field: 'price', headerName: 'Price', type: 'number', width: 100,
            valueGetter: (params) =>
                `${params.value.toFixed(2) || ''} Ɖ`,
        },
        { field: 'totalQuantity', headerName: 'Quantity', type: 'number', width: 100 }
    ];

    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState(9);
    const [sellerProducts, setSellerProducts] = useState(null);
    const [cookies, setCookies] = useCookies(['user']);

    useEffect(() => {
        // Get sellers and seller products in parallel
        // TODO Remove this after seller login ready
        const getSellers = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/users/sellers');
        const getSellerProducts = axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/items/findall?sellerId=' + selectedSeller);
        axios.all([getSellers, getSellerProducts]).then(
            axios.spread((resSellers, resSellerProducts) => {
                setSellers(resSellers.data);
                setSellerProducts(
                    resSellerProducts.data.map((product) => {
                        return {
                            ...product,
                            brandName: product.brand.name
                        }
                    })
                );
                setLoading(false);
            })
        );
    }, [selectedSeller]);
    
    if (loading) {
        return (
            <Grid xs={12}>
                <h1 className="TextGreen" style={{padding:"5rem 0 2rem 0", textAlign:"center"}}>Loading sellers</h1>
                <div id="LoadingSpinner"></div>
            </Grid>
        );;
    }
    
    const handleSellerClick = (event) => {
        setSelectedSeller(event.target.id);
    }
    
    const RenderSellerButtons = () => {
        return (
            sellers.map((seller, index) => {
                return <Button key={index} id={seller.id} variant="outlined" className="GreenButtonOutlined" onClick={(e) => handleSellerClick(e)}>{seller.sellerName}</Button>;
            })
        );
    }
    
    const removeProduct = (productId) => {
        const productToRemove = sellerProducts.find(product => product.id === productId);
        if(window.confirm(`Delete product: "${productToRemove.name}" with id: ${productToRemove.id}?`)) {
            axios.delete(process.env.REACT_APP_DB_CONNECTION + '/api/items/delete?id=' + productId, {
                headers: { 
                    'Authorization': `Bearer ${cookies.user.token}`
                }
            }).then((res) => {
                console.log(res.data);
            });
            window.location.reload();
        }
    }

    // Only sellers and admin can view the seller page
    if (!cookies.user || (cookies.user.user.role !== 'SELLER' && cookies.user.user.role !== 'ADMIN')) {
        return (
            <div>
                <h1>You do not have permission to access this page.</h1>
                <Link to="/" className='RoutingLink'>
                    <Button variant="text" className="Cart-ProductsBackButton">
                        <ArrowBackIosNewIcon/><h4>Return to products</h4>
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <Grid container className="sellerContainer">
            <Grid item>
                {RenderSellerButtons()}
            </Grid>
            <Grid item xs={12} className="sellerButtonsContainer">
                <Link to="/seller/add-product-form" className="RoutingLink">
                    <Button className="GreenButtonContained" variant="contained">
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

