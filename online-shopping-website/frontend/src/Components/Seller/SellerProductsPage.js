import * as React from 'react';
import { useEffect, useState } from 'react';
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
    const [cookies, setCookies] = useCookies(['user']);

    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);
    const [selectedSellerId, setSelectedSellerId] = useState(null);
    const [sellerProducts, setSellerProducts] = useState(null);
    const [sellerPageName, setSellerPageName] = useState(null);

    useEffect(() => {
        // If logged out or customer, stop loading and lock page
        if (!cookies.user || cookies.user.user.role === 'CUSTOMER') {
            setLoading(false);
        }

        // Seller role can view only their own products
        else if (cookies.user.user.role === 'SELLER') {
            axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/items/findall?sellerId=' + cookies.user.user.id)
                .then((resSellerProducts => {
                    setSellerProducts(
                        resSellerProducts.data.map(product => {
                            return {
                                ...product,
                                brandName: product.brand.name
                            }
                        })
                    );
                    setSellerPageName(cookies.user.user.sellerName);
                    setLoading(false);
                }));
        }

        // Admin can view products sold by all sellers
        // Load all sellers into state for buttons
        else if (cookies.user.user.role === 'ADMIN') {
            axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/users/sellers')
                .then(resSellers => {
                    setSellers(resSellers.data);
                    setSelectedSellerId(resSellers.data[0].id);
                    setSellerPageName(resSellers.data[0].sellerName);
                    setLoading(false);
                });
        }
    }, []);

    useEffect(() => {
        // When selected seller changes, show new seller products
        if (cookies.user && cookies.user.user.role === 'ADMIN') {
            axios.get(process.env.REACT_APP_DB_CONNECTION + '/api/items/findall?sellerId=' + selectedSellerId)
                .then((resSellerProducts => {
                    setSellerProducts(
                        resSellerProducts.data.map((product) => {
                            return {
                                ...product,
                                brandName: product.brand.name
                            }
                        })
                    );
                    setLoading(false);
                }));
        }
    }, [selectedSellerId, cookies.user]);

    if (loading) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1 className="TextGreen LoadingSpinnerHeader">Loading sellers</h1>
                </Grid>
                <Grid item xs={12} id="LoadingSpinner" />
            </Grid>
        );
    }

    const handleSellerClick = (event) => {
        setSelectedSellerId(event.target.id);
        setSellerPageName(event.target.name);
    }

    const RenderSellerButtons = () => {
        return (
            sellers.map((seller, index) => {
                return <Button key={index} name={seller.sellerName} id={seller.id} variant="outlined"
                    onClick={(e) => handleSellerClick(e)}>{seller.sellerName}</Button>;
            })
        );
    }

    const removeProduct = (productId) => {
        const productToRemove = sellerProducts.find(product => product.id === productId);
        if (window.confirm(`Delete product: "${productToRemove.name}" with id: ${productToRemove.id}?`)) {
            axios.delete(process.env.REACT_APP_DB_CONNECTION + '/api/items/delete?id=' + productId, {
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

    // Only sellers and admin can view the seller page
    if (!cookies.user || (cookies.user.user.role !== 'SELLER' && cookies.user.user.role !== 'ADMIN')) {
        return (
            <div>
                <h1 className="TextGreen">You do not have permission to access this page.</h1>
                <Link to="/" className='RoutingLink'>
                    <Button variant="text" className="ProductsBackButton">
                        <ArrowBackIosNewIcon /><h4>Return to products</h4>
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <Grid className="sellerContainer">
            <Grid container className="sellerTableContainer">
                <Grid item xs={12}>
                    <h1 style={{ color: "white", marginTop: 0 }}>Browsing {sellerPageName}'s Products</h1>
                </Grid>
                <Grid item xs={12}>
                    {cookies.user.user.role === 'ADMIN' && RenderSellerButtons()}
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
                <Grid item xs={12} className="sellerButtonsContainer">
                    <Link to="/seller/add-product-form" className="RoutingLink">
                        <Button className="GreenButtonContained" variant="contained">
                            Add product <AddIcon />
                        </Button>
                    </Link>
                </Grid>

            </Grid>
            <div style={{ paddingTop: "1rem" }}>
                <Link to="/" className='RoutingLink'>
                    <Button variant="text" className="ProductsBackButton">
                        <ArrowBackIosNewIcon /><h4>Return to products</h4>
                    </Button>
                </Link>
            </div>
        </Grid>

    )
        ;
}

