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
    const [cartCookie, setCookie] = useCookies(["cart"]);

    const [quantity, setQuantity] = useState(1);

    //Forces re-render on call
    const [state, setState] = useState(0);
    const forceUpdate = () => setState(state + 1);

    const IncrementItem = () => {
        //Increment quantity, ensuring that quantity does not exceed maximum 10 items per product in the cart
        if (quantity !== 10) {
            setQuantity(quantity + 1);
        }
        forceUpdate();
    }
    const DecreaseItem = () => {
        //Decrement quantity, ensuring that quantity has at least 1 item per product in the cart
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
        forceUpdate();
    }
    
    // Modify item's quantity in the cart cookie
    const modifyItemQuantity = (itemId, quantity) => {
        const foundProduct = cartCookie.cart.find(product => itemId === product.id);
        const newQuantity = foundProduct.quantity + quantity;

        setCookie("cart", cartCookie.cart.map(product => {
            if (itemId === product.id) {
                return {...product, quantity: newQuantity};
            }
            return product;
        }));
    }

    const AddToCart = () => {
        let item = props.product;

        // Cart is empty, set it to an array containing one product 
        if (!cartCookie.cart) {
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
                quantity: quantity
            }
        
 
            window.alert(newCartItem.name + " successfully added to cart.");
            //setting cookie to the new created item
            setCookie("cart", [newCartItem],
            {
                path: "/"
            }
            );
        }

        // Item already in cart
        else if (cartCookie.cart.find(product => item.id === product.id)) {
            alert(`Item ${item.name} is already in the cart. Adding ${quantity} to your cart.`);
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
                quantity: quantity
            }
            console.log(newCartItem);
            window.alert("Item(s) successfully added to cart.");
            
            //adding item to the cookie array
            cartCookie.cart.push(
                newCartItem
            );
            
            setCookie("cart", 
            cartCookie.cart,
            {
                path: "/"
            });
        }
    }

    

    return (
        //Quantity Buttons
        <div className="ProductDetails-QuantityButtonsContainer">
            <h3 className='TextGreen'>Quantity</h3>
            <Stack className="ProductDetails-QuantityButtonsStack" direction="row" spacing={1}>
                <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                        disabled={quantity === 1}
                        onClick={DecreaseItem}>
                    <RemoveIcon/>
                </Button>
                <input className="inputne" disabled={true} value={quantity}/>
                <Button className="QuantityButtons-Shared GreenButtonContained" variant="contained"
                        disabled={quantity === 10}
                        onClick={IncrementItem}>
                    <AddIcon/>
                </Button>
            </Stack>
            <h5 className="ProductDetails-ProductLimitText">Limit of 10 items per product in cart.</h5>
            <Button className="ProductDetails-CartButton GreenButtonContained"
                    variant="contained"
                    endIcon={<AddShoppingCartIcon/>}
                    disabled={false} //FIX ME: Disable button if user is a seller or admin
                    onClick={AddToCart}>
                Add to cart
            </Button>
        </div>
    );
}
export const ProductDetails = (props) => {
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
            <Grid xs={12}>
                <h1 className="TextGreen" style={{padding:"5rem 0 2rem 0", textAlign:"center"}}>Loading product: {productParams.productName}...</h1>
                <div id="LoadingSpinner"></div>
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
                        <img className="ProductDetails-Image" src={selectedProduct.picture} alt={selectedProduct.name}/>
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
                        <ProductButtons product={selectedProduct} cartItems={props.cartItems} />
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}