import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material/Container';
import { borderRight } from '@mui/system';
import { FormControlLabel, FormGroup, Menu, MenuItem, Switch } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const links = ['BOBBLE','Cart'];

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
        <Box sx={{ flexGrow: 1}}>
        <AppBar 
            className = "NavBar"
            position = "static"
            style={{ borderRadius: "1px" }}
            >
            <Toolbar>
            <Box display='flex' flexGrow={1}>
                <Typography
                    variant ="h3"
                    noWrap
                    component="div"
                >
                {links[0]}
                </Typography>
              
                <Button color='inherit'><Link to="/" className="RoutingLink">Products</Link></Button>
                <Button color='inherit'><Link to="/seller" className="RoutingLink">View my products</Link></Button>
                <Button color='inherit'>{links[1]}</Button>
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
              <AccountCircle />
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
            {auth && seller &&(
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
              <AccountCircle />
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
            {!auth && !seller &&(
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
              <AccountCircle />
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
