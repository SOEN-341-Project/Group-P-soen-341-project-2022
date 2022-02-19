import * as React from 'react';
import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import Products from '../../TestValues.json';

import Sellers from '../../TestValues.json';
// import {products, sellers} from '../../TestValues.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


const columns = [
    {field: 'id', headerName: 'ID', type: 'number', width: 20, align: 'center',},
    {
        field: 'image',
        headerName: 'Image',
        align: 'center',
        width: 70,
        renderCell: (params) => (
            <img className="sellerImage" src={params.value}/>
        ),
        sortable: false,
        filterable: false
    },
    {field: 'name', headerName: 'Product name', width: 130},
    {field: 'description', headerName: 'Description', width: 200},
    {
        field: 'price', headerName: 'Price', type: 'number', width: 90,
        valueGetter: (params) =>
            `${params.value.toFixed(2) || ''} Ɖ`,
    }
];

export const SellerProductsPage = (props) => {
    const [selectedSeller, setSelectedSeller] = React.useState(Sellers.sellers[0]);

    const handleSellerClick = (event) => {
        setSelectedSeller(event.target.name);
    }

    const RenderSellerButtons = () => {
        return (
            Sellers.sellers.map((seller, index) => {
                return <Button key={index} name={seller} variant="outlined" onClick={(e) => handleSellerClick(e)}>{seller}</Button>;
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
    
    return (
        <Grid item container>
            <Grid item>
                {RenderSellerButtons()}
            </Grid>
            <Grid item className="sellerButtonsContainer">
                <Button className="sellerButton" variant="contained" onClick={addProduct}>
                    Add product <AddIcon/>
                </Button>
                <Button className="sellerButton" variant="contained" onClick={editProduct}>
                    Edit product <EditIcon/>
                </Button>
                <Button className="sellerButton" variant="outlined" onClick={removeProduct}>
                    Delete product <DeleteIcon/>
                </Button>
            </Grid>
            <Grid item sm={12} className="sellerTable">
                <div style={{height: 400, width: '100%'}}>
                    <div style={{display: 'flex', height: '100%'}}>
                        <div style={{flexGrow: 1}}>
                            <DataGrid
                                rows={FilterSellerProducts()}
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

function removeProduct() {
    return true;
}

function addProduct() {
    return true;
}

function editProduct() {
    return true;
}
