import * as React from 'react';
import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import Products from '../../TestValues.json';

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
    return (
        <Grid item container>
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
                                rows={props.products}
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
