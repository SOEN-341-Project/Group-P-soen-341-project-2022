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

export const SellerProductsPage = (props) => {
    return (
        <Link to={{
            pathname: `/seller`,
        }} className="RoutingLink">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Brand</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.products.map((product) => (
                            <TableRow
                                key={product.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">{product.price}</TableCell>
                                <TableCell align="left">{product.description}</TableCell>
                                <TableCell align="left">{product.image}</TableCell>
                                <TableCell align="left">{product.brand}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Link>
    );
}