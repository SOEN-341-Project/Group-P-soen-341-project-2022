import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Menu, MenuItem} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";
import navLogo from '../icons/BOBBLE-05.png';
import smallNavLogo from '../icons/BOBBLE-03.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TestData from '../TestValues.json';

export default function NavBar() {
    // const [auth, setAuth] = React.useState(true);
    const [auth, setAuth] = React.useState(false);
    const [seller, setSeller] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [openLogin, setOpenLogin] = React.useState(false);

    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const handleLoginSubmit = (email, password) => {
        if(TestData.users.includes(email) && TestData.users.includes(password) && TestData.users.indexOf(email) === TestData.users.indexOf(password))
        setAuth(true);
        if(TestData.sellerAccounts.includes(email)){
            setSeller(true);
        }
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
        setSeller(event.target.checked);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
        setOpenLogin(true);
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
                        <Link to="/" className="Navbar-RoutingLink">
                            <div className="BobbleLogoPadding">
                                <img className='Bobble Navbar-LogoLarge' src={navLogo} alt='Bobble'/>
                                <img className='Bobble Navbar-LogoSmall' src={smallNavLogo} alt='Bobble'/>
                            </div>
                        </Link>
                        <Link to="/" className="Navbar-RoutingLink"><Button color='inherit'><h4
                            className="navbar-links">Products</h4> <ShoppingBagOutlinedIcon/></Button></Link>
                        <Link to="/seller" className="Navbar-RoutingLink"><Button color='inherit'><h4
                            className="navbar-links">Seller</h4> <StorefrontOutlinedIcon/></Button></Link>
                        <Link to="/my-shopping-cart" className="Navbar-RoutingLink"><Button color='inherit'><h4
                            className="navbar-links">My Cart</h4><ShoppingCartOutlinedIcon/></Button></Link>
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
                                size="small"
                                edge="end"
                                aria-label="account of non member"
                                aria-controls={unProfileId}
                                aria-haspopup="true"
                                onClick={handleOpenLogin}
                                color="inherit"
                            >
                                <p style={{paddingRight:'0.5rem'}}>Login / Sign up</p>
                                <AccountCircle/>
                            </IconButton>

                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {openLogin &&
            <div>
                <Dialog open={openLogin} onClose={handleCloseLogin}>
                    <DialogTitle style={{paddingBottom:0}}>Login</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Username / Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            required
                        />
                        <DialogContentText style={{paddingTop:'1rem'}}>
                            Don't already have an account? <Link className="GreenLink" to='/register' onClick={handleCloseLogin}>Sign up</Link> here.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className='GreenButtonText' onClick={handleCloseLogin}>Cancel</Button>
                        <Button className='GreenButtonOutlined' variant='outlined' onClick={handleCloseLogin && handleLoginSubmit} type='submit'>Login</Button>
                    </DialogActions>
                </Dialog>
            </div>}
        </Box>
    );
}
