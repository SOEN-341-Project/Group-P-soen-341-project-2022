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
    const [auth, setAuth] = React.useState(false);
    const [seller, setSeller] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    //initializing user credentials
    const [user, setUser] = React.useState({
        //TODO: add cookies
        email: '',
        password: ''
    });

    const [openLogin, setOpenLogin] = React.useState(false);

    const handleLogout = () => {
        //Login out user
        setAuth(false);
        setSeller(false);
        setAdmin(false);

        //Clearing user info on logout
        setUser({
            email: '',
            password: ''
        });
        window.alert("Successfully logged out.");
    }

    const handleOpenLogin = () => {
        //open login form
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        //close login form
        setOpenLogin(false);
    };

    const handleLoginSubmit = (event) => {
        //Username and password are valid
        if (TestData.users.filter(tempUser => tempUser.email === user.email && tempUser.password === user.password)[0]) {
            //login as default (customer access)
            setAuth(true);
            console.log("valid user");

            //User is a seller
            if (TestData.users.filter(tempUser => tempUser.email === user.email && tempUser.role === "seller")[0]) {
                //login as seller
                setSeller(true);
                console.log("user is a seller");
            }
            //User is an admin
            else if (TestData.users.filter(tempUser => tempUser.email === user.email && tempUser.role === "admin")[0]) {
                //login as admin
                setAdmin(true);
                console.log("user is an admin");
            } else {
                console.log("user is a customer");
            }
            //close login when correct info is entered
            handleCloseLogin();
        }
        //Email and password don't match
        else if (TestData.users.filter(tempUser => tempUser.email === user.email && tempUser.password !== user.password)[0]) {
            console.log("email and password don't match");
            window.alert("Incorrect Password");

            //clear form
            event.preventDefault();
        }
        //email is not in database
        else if (!(TestData.users.filter(tempUser => tempUser.email === user.email)[0])) {
            console.log("invalid email");
            window.alert("There is no account associated with this email.");

            //clear form
            event.preventDefault();
        }
        // email and password are not in database (never reaching?)
        else {
            console.log("incorrect email or password");
            window.alert("Incorrect login credentials. Verify that email and password have been entered correctly.");
            event.preventDefault();
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
        if (!auth) {
            setOpenLogin(true);
        }
    };

    const profileId = 'navbar-account-profile';
    const unProfileId = 'navbar-unaccount-profile';
    const sellerId = 'navbar-seller-profile';
    const renderAccountProfileIcon = (
        <MenuItem onClick={handleOpenUserMenu}/>
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
                    {/*Signed in as customer*/}
                    {auth && !seller && !admin && (
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
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {/*Signed in as seller*/}
                    {auth && seller && !admin && (
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
                                <MenuItem onClick={handleCloseUserMenu}><Link to="/seller">Manage
                                    Products</Link></MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {/*Signed in as admin*/}
                    {auth && admin && !seller && (
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
                                <MenuItem onClick={handleCloseUserMenu}>Manage Store</MenuItem> {/*Admin page*/}
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {/*Not signed in*/}
                    {!auth && (
                        <div>
                            <IconButton
                                sx={{borderRadius: '10px !important'}}
                                size="small"
                                edge="end"
                                aria-label="account of non member"
                                aria-controls={unProfileId}
                                aria-haspopup="true"
                                onClick={handleOpenLogin}
                                color="inherit"
                            >
                                <p style={{paddingRight: '0.5rem'}}>Login</p>
                            </IconButton>
                            <IconButton
                                sx={{borderRadius: '10px !important'}}
                                size="small"
                                edge="end"
                                aria-label="account of non member"
                                aria-controls={unProfileId}
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Link className="Navbar-RoutingLink" to='/register'><p
                                    style={{paddingRight: '1rem'}}>Sign
                                    up</p></Link>
                            </IconButton>
                            <IconButton
                                sx={{borderRadius: '10px !important', ':disabled':{ color: 'white'}}}
                                size="small"
                                edge="end"
                                aria-label="account of non member"
                                aria-controls={unProfileId}
                                aria-haspopup="true"
                                disabled
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {/*Login form state set to open*/}
            {openLogin &&
            <div>
                <Dialog open={openLogin} onClose={handleCloseLogin}>
                    <DialogTitle style={{paddingBottom: 0}}>Login</DialogTitle>
                    <form onSubmit={handleLoginSubmit} action="/">
                        <DialogContent>

                            <TextField
                                autoFocus
                                margin="dense"
                                label="Email Address"
                                value={user.email}
                                type="text"
                                fullWidth
                                variant="standard"
                                required
                                onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                value={user.password}
                                type="password"
                                fullWidth
                                variant="standard"
                                required
                                onChange={(e) => setUser({...user, password: e.target.value})}
                            />

                            <DialogContentText style={{paddingTop: '1rem'}}>
                                Don't already have an account? <Link className="GreenLink" to='/register'
                                                                     onClick={handleCloseLogin}>Sign up</Link> here.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button className='GreenButtonText' onClick={handleCloseLogin}>Cancel</Button>
                            <Button className='GreenButtonOutlined' variant='outlined' type='submit'>Login</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>}
        </Box>
    );
}
