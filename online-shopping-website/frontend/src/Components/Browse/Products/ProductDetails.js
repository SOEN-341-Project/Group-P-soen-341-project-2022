import propTypes from 'prop-types';
import { cookieAge } from '../CookieAge';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const ProductButtons = (props) => {

    //Use cookie takes the cookie name as argument and returns the cartCookie object and the setCookie method
    const [cookies, setCookie] = useCookies(["cart", "user"]);

    const [quantity, setQuantity] = useState(1);

    //Forces re-render on call
    const [state, setState] = useState(0);
    const forceUpdate = () => setState(state + 1);

    const productInCart = cookies.cart ? cookies.cart.find(product => props.product.id === product.id) : null;

    const incrementItem = () => {
        //Increment quantity, ensuring that quantity does not exceed maximum 10 items per product in the cart

        if (((productInCart ? productInCart.quantity : 0) + quantity) <= props.product.totalQuantity) {
            setQuantity(quantity + 1);
        }
        forceUpdate();
    }
    const decreaseItem = () => {
        //Decrement quantity, ensuring that quantity has at least 1 item per product in the cart
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
        forceUpdate();
    }

    // Modify item's quantity in the cart cookie
    const modifyItemQuantity = (itemId, quantity) => {
        const foundProduct = cookies.cart.find(product => itemId === product.id);
        const newQuantity = foundProduct.quantity + quantity;

        setCookie("cart", cookies.cart.map(product => {
            if (itemId === product.id) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        }), { maxAge: cookieAge });
    }

    const addToCart = () => {
        let item = props.product;

        // Cart is empty, set it to an array containing one product 
        if (!cookies.cart) {
            const newCartItem = {
                id: item.id,
                name: item.name,
                picture: item.picture,
                description: item.description,
                sellerName: item.seller.sellerName,
                sellerId: item.sellerId,
                brandName: item.brand.name,
                brandId: item.brandId,
                price: item.price,
                totalQuantity: item.totalQuantity,
                quantity: quantity
            }

            //setting cookie to the new created item
            setCookie("cart", [newCartItem], { maxAge: cookieAge });
        }

        // Item already in cart
        else if (productInCart) {
            modifyItemQuantity(item.id, quantity);
        }

        // Cart already made, don't have the item
        else {
            const newCartItem = {
                id: item.id,
                name: item.name,
                picture: item.picture,
                description: item.description,
                sellerName: item.seller.sellerName,
                sellerId: item.sellerId,
                brandName: item.brand.name,
                brandId: item.brandId,
                price: item.price,
                totalQuantity: item.totalQuantity,
                quantity: quantity
            }

            //adding item to the cookie array
            cookies.cart.push(
                newCartItem
            );

            setCookie("cart", cookies.cart, { maxAge: cookieAge });
        }
    }

    if (props.product.totalQuantity === 0) {
        return <h3 className='TextPink'>Out of stock</h3>;
    }

    return (
        //Quantity Buttons
        <div className="ProductDetails-QuantityButtonsContainer">
            <h3 className='TextGreen'>Quantity</h3>
            <Stack className="ProductDetails-QuantityButtonsStack" direction="row" spacing={1}>
                <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                    disabled={quantity === 1}
                    onClick={decreaseItem}>
                    <RemoveIcon />
                </Button>
                <input className="inputne" disabled={true} value={quantity} />
                <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                    disabled={((productInCart ? productInCart.quantity : 0) + quantity) >= props.product.totalQuantity}
                    onClick={incrementItem}>
                    <AddIcon />
                </Button>
            </Stack>
            <h5 className="ProductDetails-ProductLimitText">There {props.product.totalQuantity > 1 ? 'are' : 'is'} {props.product.totalQuantity} in stock.</h5>
            {
                // If product is in the user's cart, show quantity of item in cart
                productInCart &&
                <h5 className="ProductDetails-ProductLimitText">You currently have {productInCart.quantity} in your cart.</h5>
            }
            <Button className="ProductDetails-CartButton GreenButtonContained"
                variant="contained"
                endIcon={<AddShoppingCartIcon />}
                // Can't add to cart if logged out, or non-customer, or adding to cart would surpass total quantity
                disabled={
                    !cookies.user
                    || cookies.user.user.role !== 'CUSTOMER'
                    || ((productInCart ? productInCart.quantity : 0) + quantity) > props.product.totalQuantity}
                onClick={addToCart}>
                Add to cart
            </Button>
            {
                // Logged out users may not add to cart
                !cookies.user &&
                <h5 className="ProductDetails-ProductLimitText">You must be logged in to add to cart.</h5>
            }
            {
                // Non-customers may not add to cart
                cookies.user && cookies.user.user.role !== 'CUSTOMER' &&
                <h5 className="ProductDetails-ProductLimitText">Only customers may add to cart.</h5>
            }
        </div>
    );
}
export const ProductDetails = () => {
    //Resetting scrolling to top of the page
    window.scrollTo(0, 0);

    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    //Getting product name from URL
    const productParams = useParams();

    // Get product by id
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_DB_CONNECTION + "/api/items/find/?id=" + productParams.productId).then((res) => {
            setSelectedProduct(res.data);
            setLoading(false);
        });
    }, [productParams.productId]);

    // Display load screen while getting data
    if (loading) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1 className="TextGreen LoadingSpinnerHeader">Loading product: {productParams.productName}</h1>
                </Grid>
                <Grid item xs={12} id="LoadingSpinner" />
            </Grid>
        );
    }

    return (
        <Grid container className="ProductDetails-Container">
            <Link to="/" className="RoutingLink">
                <Button variant="contained" className="GreenButtonContained">
                    Return to products
                </Button>
            </Link>

            <Grid item container xs={12} className="ProductDetails-ItemContainer">
                <Grid item xs={12} md={6}>
                    <h1>{selectedProduct.name}</h1>
                    <div className="ProductDetails-ImageConatiner">
                        <img className="ProductDetails-Image" src={selectedProduct.picture} alt={selectedProduct.name} />
                    </div>

                    <Grid item container>
                        <Grid item xs={12} md={6}>
                            <h3>Brand</h3>
                            <p>{selectedProduct.brand.name}</p>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <h3>Seller</h3>
                            <p>{selectedProduct.seller.sellerName}</p>
                        </Grid>
                    </Grid>
                    <h3>Description</h3>
                    <p>{selectedProduct.description}</p>
                </Grid>
                <Grid item md={1} />
                <Grid item xs={12} sm={12} md={5}>
                    <Card className="ProductDetails-SelectionPanel">
                        <h3 className='TextGreen'>Price</h3>
                        <h4 className='TextPink'>{selectedProduct.price} Ɖ</h4>
                        <ProductButtons product={selectedProduct} />
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}

// Check prop types
ProductButtons.propTypes = {
    product: propTypes.shape({
        id: propTypes.number,
        name: propTypes.string,
        picture: propTypes.string,
        description: propTypes.string,
        seller: propTypes.object,
        sellerId: propTypes.number,
        brand: propTypes.object,
        brandId: propTypes.number,
        price: propTypes.number,
        totalQuantity: propTypes.number,
    })
}