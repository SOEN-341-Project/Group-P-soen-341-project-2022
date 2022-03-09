import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Stack, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
// import Products from '../../TestValues.json';

// const SellerProductsForm = () => {
//     // Get product ID from URL parameters
//     const { productId } = useParams();

//     const [modifyingProduct, setModifyingProduct] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Get product by id
//     useEffect(() => {
//         axios.get("http://localhost:8080/api/items/find/?id=" + productId).then((res) => {
//             setModifyingProduct(res.data);
//             setLoading(false);
//         });
//     }, [productId]);
    
    
//     // Find seller product by product ID
//     const findSellerProduct = () => {
//         if (productId) {
//             const sellerProduct = Products.products.find((product) => product.id === parseInt(productId));
//             return <ModifyProductForm sellerProduct={sellerProduct} />;
//         }
//         return <AddNewProductForm />;
//     }

//     return findSellerProduct();
// }

export const ModifyProductForm = (props) => {
    // Get product ID from URL parameters
    const { productId } = useParams();

    const [modifiedProduct, setModifiedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get product by ID, use it to autofill form fields
    useEffect(() => {
        axios.get("http://localhost:8080/api/items/find/?id=" + productId).then((res) => {
            console.log(res.data);
            setModifiedProduct(res.data);
            setLoading(false);
        });
    }, [productId]);
    
    const handleSubmit = () => {
        // TODO: Get brand by id, then post that brand id correctly
        axios.post("http://localhost:8080/api/items/update", modifiedProduct)
        .then((res) => {
            console.log(res);
        });
    }

    const handleFieldChange = (event) => {
        console.log(`Change! Target name: ${event.target.name}\nTarget value: ${event.target.value}`)
        setModifiedProduct({
            ...modifiedProduct,
            [event.target.name]: event.target.value
        });
    }
    
    // TODO: Add image uploading
    // const handleImageChange = (e) => {

    // }
    
    if (loading) {
        return <h1>Loading form...</h1>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ maxWidth: '550px', margin: 'auto' }}>
                <h1>Modify Product "{modifiedProduct.name}"</h1>
                <TextField 
                    label="Name"
                    name="name"
                    required 
                    value={modifiedProduct.name}
                    onChange={handleFieldChange}
                />
                <TextField 
                    label="Price" 
                    name="price"
                    type="number" 
                    required 
                    value={modifiedProduct.price}
                    onChange={handleFieldChange}
                    InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: <InputAdornment position="end">Ɖ</InputAdornment>
                    }} 
                />
                <TextField 
                    label="Description" 
                    name="description"
                    required 
                    multiline 
                    rows={4} 
                    value={modifiedProduct.description} 
                    onChange={handleFieldChange}
                    />
                {
                    // TODO: Add image uploading
                    /* 
                    <Button component="label">
                    Upload Image
                    <input type="file" accept="image/*" hidden required onChange={handleImageChange} />
                    </Button> 
                    */
                }
                <TextField 
                    label="Brand" 
                    name="brand"
                    required 
                    value={modifiedProduct.brand.name}
                    onChange={handleFieldChange}
                    />
                <TextField 
                    label="Seller" 
                    name="seller"
                    disabled 
                    value={modifiedProduct.seller.sellerName}
                    onChange={handleFieldChange}
                    />
                <TextField 
                    label="Quantity" 
                    name="totalQuantity"
                    type="number" 
                    required 
                    inputProps={{ min: 1 }} 
                    value={modifiedProduct.totalQuantity}
                    onChange={handleFieldChange} 
                    />
                <Button name="Save changes" type="submit">Save Changes</Button>
            </Stack>
        </form>
    );
}

export const AddNewProductForm = () => {

    // TODO: Replace with logged in seller name when account management or adding with params ready
    const sellerName = '';

    const handleSubmit = () => {
        // TODO: Add product to database
    }

    // TODO: Add image uploading
    // const handleImageChange = (e) => {

    // }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ maxWidth: '550px', margin: 'auto' }}>
                <h1>Add a product</h1>
                <TextField label="Name" required />
                <TextField 
                    label="Price"
                    type="number"
                    required 
                    InputProps={{
                        inputProps: { min: 0, step: "0.5" },
                        endAdornment: <InputAdornment position="end">Ɖ</InputAdornment>
                    }} 
                />
                <TextField label="Description" required multiline rows={4} />
                {
                    // TODO: Add image uploading
                    /* 
                    <Button component="label">
                    Upload Image
                    <input type="file" accept="image/*" hidden required onChange={handleImageChange} />
                    </Button> 
                    */
                }
                <TextField label="Brand" required />
                <TextField label="Seller" disabled value={sellerName} />
                <TextField label="Quantity" type="number" required inputProps={{ min: 1 }} />
                <Button name="Add Product" type="submit">Add Product</Button>
            </Stack>
        </form>
    );
}