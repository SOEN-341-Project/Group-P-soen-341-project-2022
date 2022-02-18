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
import { Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width:'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0,2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1,1,1,0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const links = ['BOBBLE','Menu','Cart'];

//the below section is some preliminary stuff for the user profile
// const profileLoggedIn = [maskEmail, 'Profile', 'Logout'];
// const profile=['Login', 'Register'];

// const maskEmail="";
// const fakeEmail="jeffb@amazon.com";
// const prefix = fakeEmail.substring(0,fakeEmail .lastIndexOf("@"));
// const postfix = fakeEmail.substring(fakeEmail .lastIndexOf('@'));

// for (var i=0; i<prefix.length; i++){
//     if(i==0 || i==prefix.length-1){
//         maskEmail=maskEmail+prefix[i].toString();
//     }
//     else{
//         maskEmail = maskEmail + "*";
//     }
// }
// maskEmail = maskEmail+postfix;

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleOpenUserMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };
    const profileId = 'navbar-account-profile';
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
                <Button color='inherit'><Link to="/sellerPage" className="RoutingLink">Temporary Seller</Link></Button>
                <Button color='inherit'>{links[1]}</Button>
                <Button color='inherit'>{links[2]}</Button>
                {/* <Button color='inherit'>{links[3]}</Button>
                <Button color='inherit'>{links[4]}</Button> */}
                </Box>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder = "Search..."
                        inputProps={{ 'aria-label': 'search'}}
                    />
                </Search>
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
            </Toolbar>
        </AppBar>
        {renderAccountProfileIcon}
        </Box>
    );
}
