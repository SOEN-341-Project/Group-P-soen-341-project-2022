import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Stack, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';

export const ModifyProductForm = (props) => {
    // Get product ID from URL parameters
    const { productId } = useParams();

    // Waiting for HTTP requests
    const [loading, setLoading] = useState(true);
    
    // Chosen product
    const [modifiedProduct, setModifiedProduct] = useState(null);

    // States for image preview
    const [fileSelected, setFileSelected] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Get product by ID, use it to autofill form fields
    useEffect(() => {
        axios.get(process.env.REACT_APP_DB_CONNECTION + "/api/items/find/?id=" + productId).then((res) => {
            setModifiedProduct(res.data);
            setImagePreview(res.data.picture);
            setLoading(false);
        });
    }, [productId]);

    // Load image preview when file changes
    useEffect(() => {
        if (!fileSelected) {
            setImagePreview(undefined);
            return;
        }

        // Make a temporary image URL for previewing
        const imageURL = URL.createObjectURL(fileSelected);
        setImagePreview(imageURL);

        return () => URL.revokeObjectURL(imageURL);
    }, [fileSelected]);
   
    const handleSubmit = () => {
        axios.post(process.env.REACT_APP_DB_CONNECTION + "/api/items/update", modifiedProduct)
        .then(() => {
            window.location.reload();
        });
    }

    const handleFieldChange = (event) => {
        setModifiedProduct({
            ...modifiedProduct,
            [event.target.name]: event.target.value
        });
    }
    
    const handleImageChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFileSelected(undefined);
            return;
        }
        setFileSelected(e.target.files[0]); // One image only
        modifiedProduct.picture = e.target.files[0];
        setModifiedProduct(modifiedProduct);
    }
    
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
                        inputProps: { min: 0, step: 0.01 },
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
                    imagePreview && <img src={imagePreview} alt="Product Preview" />
                }
                <Button type="button" component="label">
                    Upload Image
                    <input name="picture" type="file" accept="image/*" hidden onChange={handleImageChange} />
                </Button> 
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
                <Button type="submit">Save Changes</Button>
            </Stack>
        </form>
    );
}

export const AddNewProductForm = () => {
    // New product values
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        description: '',
        picture: null,
        brand: {
            name: ''
        },
        seller: {
            sellerName: ''
        },
        totalQuantity: 0
    });

    // States for image preview
    const [fileSelected, setFileSelected] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (!fileSelected) {
            setImagePreview(undefined);
            return;
        }

        const imageURL = URL.createObjectURL(fileSelected);
        setImagePreview(imageURL);

        return () => URL.revokeObjectURL(imageURL);
    }, [fileSelected]);

    // TODO: Replace with logged in seller name when account management or adding with params ready
    // TODO Get route for seller id -> name
    const sellerName = '';

    const handleFieldChange = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (e) => {
        axios.post(process.env.REACT_APP_DB_CONNECTION + "/api/items/create", newProduct).then((res) => {
            window.location.reload();
        });
    }

    const handleImageChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFileSelected(undefined);
            return;
        }
        setFileSelected(e.target.files[0]); // One image only
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ maxWidth: '550px', margin: 'auto' }}>
                <h1>Add a product</h1>
                <TextField 
                    label="Name" 
                    required
                    value={newProduct.name}
                    onChange={handleFieldChange} 
                    />
                <TextField 
                    label="Price"
                    type="number"
                    required 
                    value={newProduct.price}
                    onChange={handleFieldChange} 
                    InputProps={{
                        inputProps: { min: 0, step: "0.5" },
                        endAdornment: <InputAdornment position="end">Ɖ</InputAdornment>
                    }} 
                />
                <TextField 
                    label="Description" 
                    required 
                    value={newProduct.description}
                    onChange={handleFieldChange} 
                    multiline 
                    rows={4}
                    />
                {
                    fileSelected && <img src={imagePreview} alt="Product Preview" />
                }
                <Button component="label">
                    Upload Image
                    <input type="file" accept="image/*" hidden required onChange={handleImageChange} />
                </Button> 
                <TextField 
                    label="Brand" 
                    required
                    value={newProduct.brand.name}
                    onChange={handleFieldChange} 
                />
                <TextField 
                    label="Seller" 
                    disabled 
                    value={sellerName} 
                    onChange={handleFieldChange} 
                />
                <TextField 
                    label="Quantity" 
                    type="number" 
                    required 
                    value={newProduct.totalQuantity}
                    onChange={handleFieldChange} 
                    inputProps={{ min: 1 }} 
                />
                <Button type="submit">Add Product</Button>
            </Stack>
        </form>
    );
}