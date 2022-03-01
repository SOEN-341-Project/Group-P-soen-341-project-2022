import { useParams } from 'react-router-dom';
import { Button, Stack, InputAdornment, TextField } from '@mui/material';
import Products from '../../TestValues.json';
import { Link } from "react-router-dom";


export const SellerProductsForm = () => {
    const { productId } = useParams();

    // Find seller product by product ID
    const findSellerProduct = () => {
        console.log('findSellerProduct() called');
        if (productId) {
            const sellerProduct = Products.products.find((product) => product.id === parseInt(productId));
            return <ModifyProductForm sellerProduct={sellerProduct} />;
        }
        return <AddNewProductForm />;
    }

    return findSellerProduct();
}

const ModifyProductForm = (props) => {
    const handleSubmit = () => {
        // TODO: Modify product in database
    }

    // TODO: Add image uploading
    // const handleImageChange = (e) => {

    // }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ maxWidth: '550px', margin: 'auto', textAlign: 'center' }}>
                <h1 className='TextPink'>Modify Product "{props.sellerProduct.name}"</h1>
                <TextField
                    label="Name"
                    required
                    defaultValue={props.sellerProduct.name} />
                <TextField
                    label="Price"
                    type="number"
                    required
                    defaultValue={props.sellerProduct.price}
                    InputProps={{
                        inputProps: { min: 0, step: "0.5" },
                        endAdornment: <InputAdornment position="end">Ɖ</InputAdornment>
                    }}
                />
                <TextField label="Description" required multiline rows={4} defaultValue={props.sellerProduct.description} />
                {
                    // TODO: Add image uploading
                    /* 
                    <Button component="label">
                    Upload Image
                    <input type="file" accept="image/*" hidden required onChange={handleImageChange} />
                    </Button> 
                    */
                }
                <TextField label="Brand" required defaultValue={props.sellerProduct.brand} />
                <TextField label="Seller" disabled defaultValue={props.sellerProduct.seller} />
                <TextField label="Quantity" type="number" required inputProps={{ min: 1 }} defaultValue={props.sellerProduct.quantity} />
                <Link to="/seller" className="RoutingLink" style={{ textAlign: 'center', padding: '1rem' }}>
                    <Button sx={{ maxWidth: '10rem' }} className="GreenButtonContained" variant="contained" name="Save changes" type="submit">Save Changes</Button>
                </Link>
            </Stack>
        </form>
    );
}

const AddNewProductForm = () => {

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
                <TextField label="Seller" disabled defaultValue={sellerName} />
                <TextField label="Quantity" type="number" required inputProps={{ min: 1 }} />
                <Button name="Add Product" type="submit">Add Product</Button>
            </Stack>
        </form>
    );
}