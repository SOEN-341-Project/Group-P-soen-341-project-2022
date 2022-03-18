import { useEffect, useState, createRef } from 'react';
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
    let imageRef = createRef();

    // Get product by ID, use it to autofill form fields
    useEffect(() => {
        axios.get(process.env.REACT_APP_DB_CONNECTION + "/api/items/find/?id=" + productId).then((res) => {
            setModifiedProduct(res.data);
            console.log(res.data);
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
        // Get brand ID by name -> POST brandId instead of brand name
        axios.get(process.env.REACT_APP_DB_CONNECTION + "/api/brands/find?name=" + modifiedProduct.brand.name)
        .then((res) => {
            // TODO Fix -> Only taking first found brand id, have to consider duplicate brands
            console.log(res.data);
            let brands = res.data;

            // If no brand found with that ID, create it
            if (!brands[0]) {
                console.log(modifiedProduct.brand.name);
                axios({
                    method: "post",
                    url: process.env.REACT_APP_DB_CONNECTION + "/api/brands/create",
                    data: {
                        name: modifiedProduct.brand.name
                    },
                    headers: { "Content-Type": "multipart/form-data" }
                })
                .then((createBrandRes) => {
                    console.log(createBrandRes.data);
                    brands = [createBrandRes.data];
                    // Update product with new product data
                    return axios({
                        method: "post",
                        url: process.env.REACT_APP_DB_CONNECTION + "/api/items/update",
                        data: {
                            ...modifiedProduct,
                            brandId: brands[0].id,
                            // TODO Get seller ID from cookie
                            sellerId: 9
                        },
                        headers: { "Content-Type": "multipart/form-data" }
                    });

                })
                .catch(() => {
                    return;
                });
            }
            else {
                
                // Update product with new product data
                return axios({
                    method: "post",
                    url: process.env.REACT_APP_DB_CONNECTION + "/api/items/update",
                    data: {
                        ...modifiedProduct,
                        brandId: brands[0].id,
                        // TODO Get seller ID from cookie
                        sellerId: 9
                    },
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
        })
        .then((res) => {
            console.log(res);
            // window.location.reload();
        });
    }

    const handleFieldChange = (event) => {
        // TODO Autocomplete brand names with available brands (may be >1 brand with name, have to choose correct id)
        if (event.target.name === "brandName") {
            setModifiedProduct({
                ...modifiedProduct,
                brand: {
                    name: event.target.value
                }
            })
        } else {
            setModifiedProduct({
                ...modifiedProduct,
                [event.target.name]: event.target.value
            });
        }
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
                    <input name="picture" type="file" accept="image/*" ref={imageRef} hidden onChange={handleImageChange} />
                </Button> 
                <TextField 
                    label="Brand" 
                    name="brandName"
                    required 
                    value={modifiedProduct.brand.name}
                    onChange={handleFieldChange}
                    />
                <TextField 
                    label="Seller" 
                    name="sellerName"
                    disabled 
                    defaultValue={modifiedProduct.seller.sellerName}
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
    // const [newProduct, setNewProduct] = useState({});

    // States for image preview
    const [fileSelected, setFileSelected] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    let imageRef = createRef();

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
        // TODO Autocomplete brand names with available brands (may be >1 brand with name, have to choose correct id)
        if (event.target.name === "brandName") {
            setNewProduct({
                ...newProduct,
                brand: {
                    name: event.target.value
                }
            })
        } else {
            setNewProduct({
                ...newProduct,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleSubmit = () => {
        // Get brand ID by name -> POST brandId instead of brand name
        axios.get(process.env.REACT_APP_DB_CONNECTION + "/api/brands/find?name=" + newProduct.brand.name)
        .then((res) => {
            // TODO Fix -> Only taking first found brand id, have to consider duplicate brands
            console.log(res.data);
            let brands = res.data;

            // If no brand found with that ID, create it
            if (!brands[0]) {
                console.log(newProduct.brand.name);
                return axios.post(process.env.REACT_APP_DB_CONNECTION + "/api/brands/create", {
                    name: newProduct.brand.name
                })
                // axios({
                //     method: "post",
                //     url: process.env.REACT_APP_DB_CONNECTION + "/api/brands/create",
                //     data: {
                //         name: newProduct.brand.name
                //     },
                //     headers: { "Content-Type": "multipart/form-data" }
                // })
                .then((createBrandRes) => {
                    console.log(createBrandRes.data);
                    brands = [createBrandRes.data];
                    // Update product with new product data
                    return axios({
                        method: "post",
                        url: process.env.REACT_APP_DB_CONNECTION + "/api/items/create",
                        data: {
                            ...newProduct,
                            brandId: brands[0].id,
                            // TODO Get seller ID from cookie
                            sellerId: 9
                        },
                        headers: { "Content-Type": "multipart/form-data" }
                    });

                })
                .catch(() => {
                    return;
                });
            }
            else {
                
                // Update product with new product data
                return axios({
                    method: "post",
                    url: process.env.REACT_APP_DB_CONNECTION + "/api/items/create",
                    data: {
                        ...newProduct,
                        brandId: brands[0].id,
                        // TODO Get seller ID from cookie
                        sellerId: 9
                    },
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
        })
        .then((res) => {
            console.log(res);
            // window.location.reload();
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
                    name="name"
                    label="Name" 
                    required
                    value={newProduct.name}
                    onChange={handleFieldChange} 
                    />
                <TextField 
                    name="price"
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
                    name="description"
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
                    <input name="picture" type="file" accept="image/*" ref={imageRef} hidden required onChange={handleImageChange} />
                </Button> 
                <TextField 
                    name="brandName"
                    label="Brand" 
                    required
                    value={newProduct.brand.name}
                    onChange={handleFieldChange} 
                />
                <TextField 
                    name="sellerName"
                    label="Seller" 
                    disabled 
                    value={sellerName} 
                    onChange={handleFieldChange} 
                />
                <TextField 
                    name="totalQuantity"
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