import * as React from 'react';
import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import Products from '../../TestValues.json';
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
        renderCell: (params: GridRenderCellParams<Date>) => (
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
    return (
        <Grid item sm={12} className="sellerTable">
            <div style={{height: 400, width: '100%'}}>
                <div style={{display: 'flex', height: '100%'}}>
                    <div style={{flexGrow: 1}}>
                        <DataGrid
                            rows={props.products}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </Grid>
    );
}

/*const SellerButtons = () => {
    <Button variant="outlined" onClick={removeProduct}>
        Delete product <DeleteIcon/>
    </Button>
    <Button variant="outlined" onClick={addProduct}>
        Add product <AddIcon/>
    </Button>
    <Button variant="outlined" onClick={editProduct}>
        Edit product <EditIcon/>
    </Button>
}

function removeProduct() {

}

function addProduct() {

}

function editProduct() {

}*/