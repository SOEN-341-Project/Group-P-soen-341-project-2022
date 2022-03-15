import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Products from '../../TestValues.json';
import Sellers from '../../TestValues.json';

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
            <Button className="sellerButton GreenButtonText" variant="text" onClick={removeProduct(params.id)}>
                <DeleteIcon />
            </Button>
        ),
        sortable: false,
        filterable: false,
        hideable: false
    },
    { field: 'id', headerName: 'ID', type: 'number', width: 20, align: 'center', },
    {
        field: 'image',
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
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 }
];

export const SellerProductsPage = () => {
    const [selectedSeller, setSelectedSeller] = React.useState(Sellers.sellers[0]);

    const handleSellerClick = (event) => {
        setSelectedSeller(event.target.name);
    }

    const RenderSellerButtons = () => {
        return (
            Sellers.sellers.map((seller, index) => {
                return <Button key={index} name={seller} className="GreenButtonText" variant="text" onClick={(e) => handleSellerClick(e)}>{seller}</Button>;
            })
        );
    }

    const FilterSellerProducts = () => {
        return (
            Products.products.filter((product) => (
                product.seller === selectedSeller
            ))
        );
    }

    const rows = FilterSellerProducts();

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
                                rows={rows}
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
    // console.log(productId);
    return true;
}