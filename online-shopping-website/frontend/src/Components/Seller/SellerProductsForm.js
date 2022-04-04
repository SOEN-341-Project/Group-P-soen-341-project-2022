import * as React from 'react';
import {createRef, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, InputAdornment, Stack, TextField} from '@mui/material';
import {useCookies} from 'react-cookie';
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const SellerForm = () => {
    // React router navigation (for redirecting)
    let navigate = useNavigate();

    // Cookies
    const [cookies] = useCookies(['user']);

    // Get product ID from URL parameters
    const { productId } = useParams();

    // Dictates whether form will modify a product or add a new product
    const formType = productId ? 'MODIFY' : 'ADD';

    // Waiting for HTTP requests
    const [loading, setLoading] = useState(true);

    // Chosen product
    const [productData, setProductData] = useState(null);

    // States for image preview
    const [fileSelected, setFileSelected] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    let imageRef = createRef();

    // Get product by ID, use it to autofill form fields
    // If no id is provided, use product skeleton, since we are adding a new product
    useEffect(() => {
        if (formType === 'MODIFY') {
            axios.get(process.env.REACT_APP_DB_CONNECTION + "/api/items/find?id=" + productId).then((res) => {
                setProductData(res.data);
                setImagePreview(res.data.picture);
                setLoading(false);
            });
        } else {
            setProductData({
                name: '',
                price: '',
                description: '',
                brand: {name: ''},
                seller: {sellerName: cookies.user.user.sellerName},
                totalQuantity: ''
            })
            setLoading(false);
        }
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


    // Update product data state with inputted field data
    const handleFieldChange = (event) => {   
        // Brand name is in a different format than other fields (nested)
        if (event.target.name === "brandName") {
            setProductData({
                ...productData,
                brand: {
                    name: event.target.value
                }
            })
        } else {
            setProductData({
                ...productData,
                [event.target.name]: event.target.value
            });
        }
    }

    // Triggers when new image is uploaded
    const handleImageChange = (e) => {
        // No files selected, make it undefined
        if (!e.target.files || e.target.files.length === 0) {
            setFileSelected(undefined);
            return;
        }

        // Ensure only one image is being selected
        setFileSelected(e.target.files[0]);
    }

    // Update/create product on submit
    const handleSubmit = async (event) => {
        // Avoid default form action
        event.preventDefault();

        // Create form data for file uploading
        let formData = new FormData();

        // Check if brand already exists
        const brands = await axios.get(process.env.REACT_APP_DB_CONNECTION + "/api/brands/find?name=" + productData.brand.name);

        let selectedBrand = brands.data[0];

        // No brand found, create the brand
        if (!selectedBrand) {
            selectedBrand = await axios.post(process.env.REACT_APP_DB_CONNECTION + "/api/brands/create", {
                name: productData.brand.name
            }, {
                headers: {
                    'Authorization': `Bearer ${cookies.user.token}`
                }
            });
            selectedBrand = selectedBrand.data;
        }

        // Add form fields to form data
        for (const field in productData) {
            formData.append(field, productData[field]);
        }
        formData.append('picture', fileSelected);
        formData.append('brandId', selectedBrand.id);
        formData.append('sellerId', cookies.user.user.id);

        try {
            if (formType === 'MODIFY') {
                // Update product with modified product data
                await axios.post(process.env.REACT_APP_DB_CONNECTION + "/api/items/update", formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${cookies.user.token}`
                    }
                });
            } else {
                // Create product with new product data
                await axios.post(process.env.REACT_APP_DB_CONNECTION + "/api/items/create", formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${cookies.user.token}`
                    }
                });
            }
        }
        catch(err) {
            window.alert(
                err.response.data.error + ".\n" + 
                (err.response.data.message ? err.response.data.message + "." : ""));
        }

        navigate('/seller');
    }

    // White loading, show loading screen with spinner
    if (loading) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1 className="TextGreen LoadingSpinnerHeader">Loading form</h1>
                </Grid>
                <Grid item xs={12} id="LoadingSpinner"/>
            </Grid>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Link to="/seller" className='RoutingLink'>
                <Button variant="text" className="ProductsBackButton">
                    <ArrowBackIosNewIcon/><h4>Return to seller products</h4>
                </Button>
            </Link>
            <Stack spacing={2} sx={{maxWidth: '550px', margin: 'auto'}}>
                <h1 className="TextGreen" style={{textAlign: 'center'}}>
                    {/* Change heading depending on if product is existing or new. */}
                    {formType === 'MODIFY' ? `Modify Product "${productData.name}"` : 'Add A Product'}
                </h1>
                <TextField
                    label="Name"
                    name="name"
                    required
                    value={productData.name}
                    onChange={handleFieldChange}
                />
                <TextField
                    label="Price"
                    name="price"
                    type="text"
                    required
                    value={productData.price}
                    onChange={handleFieldChange}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*(.[0-9][0-9])?',
                        title: 'Include 0 or 2 decimal places. ex.: 17.95'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Ɖ</InputAdornment>
                    }}
                />
                <TextField
                    label="Description"
                    name="description"
                    required
                    multiline
                    rows={4}
                    value={productData.description}
                    onChange={handleFieldChange}
                />
                {
                    imagePreview && <img src={imagePreview} alt="Product Preview"/>
                }
                <Button type="button" className="GreenButtonText" component="label"
                        style={{width: "fit-content", margin: "1rem auto"}}>
                    <UploadIcon/> Upload Image
                    <input name="picture" type="file" accept="image/*" ref={imageRef} hidden
                            onChange={handleImageChange}/>
                </Button>
                <TextField
                    label="Brand"
                    name="brandName"
                    required
                    value={productData.brand.name}
                    onChange={handleFieldChange}
                />
                <TextField
                    label="Seller"
                    name="sellerName"
                    disabled
                    defaultValue={productData.seller.sellerName}
                    onChange={handleFieldChange}
                />
                <TextField
                    label="Quantity"
                    name="totalQuantity"
                    type="text"
                    required
                    inputProps={{
                        min: 1,
                        inputMode: 'numeric',
                        pattern: '[1-9][0-9]*',
                        title: 'Must be a positive whole number.'
                    }}
                    value={productData.totalQuantity}
                    onChange={handleFieldChange}
                />
                <Button type="submit" variant="contained" className="GreenButtonContained"
                        style={{width: "fit-content", margin: "1rem auto"}}>
                    Save Changes
                </Button>
            </Stack>
        </form>
    );
}
