import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Products from '../../TestValues.json';
import Sellers from '../../TestValues.json';

const columns = [
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
    {
        field: 'price', headerName: 'Price', type: 'number', width: 90,
        valueGetter: (params) =>
            `${params.value.toFixed(2) || ''} Ɖ`,
    }
];

export const SellerProductsPage = () => {
    const [selectedSeller, setSelectedSeller] = React.useState(Sellers.sellers[0]);
    const [selectionModel, setSelectionModel] = React.useState();

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

    const rows = FilterSellerProducts();

    return (
        <Grid container>
            <Grid item>
                {RenderSellerButtons()}
            </Grid>
            <Grid item className="sellerButtonsContainer">
                <Link to="/seller/add-product-form" className="RoutingLink">
                    <Button className="sellerButton" variant="contained">
                        Add product <AddIcon />
                    </Button>
                </Link>
                <Link to="/seller/someId" className="RoutingLink">
                    <Button className="sellerButton" variant="contained" onClick={editProduct}>
                        Edit product <EditIcon />
                    </Button>
                </Link>
                <Button className="sellerButton" variant="outlined" onClick={removeProduct}>
                    Delete product <DeleteIcon />
                </Button>
            </Grid>
            <Grid item sm={12} className="sellerTable">
                <div style={{ height: 400, width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                selectionModel={selectionModel}
                                hideFooterSelectedRowCount
                                onSelectionModelChange={(selection) => {
                                    if (selection.length > 1) {
                                        const selectionSet = new Set(selectionModel);
                                        const result = selection.filter((s) => !selectionSet.has(s));
                                        setSelectionModel(result);
                                    } else {
                                        setSelectionModel(selection);
                                        const selectedSet = new Set(selectionModel);
                                        const selectedRowData = rows.filter((row) =>
                                            selectedSet.has(row.id)
                                        );
                                        console.log(selectedRowData[0].name); //get row id instead of 0 from filter
                                    }
                                }}
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

function editProduct() {
    return true;
}
