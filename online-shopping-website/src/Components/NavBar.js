import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Menu, MenuItem} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export default function NavBar() {
    const [auth, setAuth] = React.useState(true);
    const [seller, setSeller] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
        setSeller(event.target.checked);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };


    const profileId = 'navbar-account-profile';
    const unProfileId = 'navbar-unaccount-profile';
    const sellerId = 'navbar-seller-profile';
    const renderAccountProfileIcon = (
        <MenuItem onClick={handleOpenUserMenu}>
        </MenuItem>
    )

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                className="NavBar"
                position="static"
                style={{borderRadius: "1px"}}
            >
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Typography
                            variant="h3"
                            noWrap
                            component="div"
                            className="Navbar-LogoLarge"
                        >
                            Bobble
                        </Typography>
                        {/*FIXME: image route is incorrect*/}
                        <img className="Navbar-LogoSmall" src="./icons/bobbleLogo.png"/>
                        <Link to="/" className="Navbar-RoutingLink"><Button color='inherit'><h4 className="navbar-links">Products</h4> <ShoppingBagOutlinedIcon/></Button></Link>
                        <Link to="/seller" className="Navbar-RoutingLink"><Button color='inherit'><h4 className="navbar-links">Seller</h4> <StorefrontOutlinedIcon/></Button></Link>
                        <Link to="/my-shopping-cart" className="Navbar-RoutingLink"><Button color='inherit'><h4 className="navbar-links">My Cart</h4><ShoppingCartOutlinedIcon/></Button></Link>
                    </Box>
                    {auth && !seller && (
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={profileId}
                                aria-haspopup="true"
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id='navbar-account-profile'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>My Account Info</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {auth && seller && (
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={sellerId}
                                aria-haspopup="true"
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id='navbar-seller-profile'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>My Account Info</MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>Manage Orders</MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>Manage Products</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth && !seller && (
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of non member"
                                aria-controls={unProfileId}
                                aria-haspopup="true"
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id='navbar-unaccount-profile'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>Sign Up!</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {renderAccountProfileIcon}
        </Box>
    );
}
