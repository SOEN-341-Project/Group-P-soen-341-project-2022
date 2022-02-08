import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
//import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material';
//import Avatar from '@mui/material/Avatar';
//import { Container } from '@mui/material/Container';

/**const Search = styled('div')(({theme}) => ({
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
**/
const links = ['BOBBLE','Menu','Cart','Sign In','Register'];

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1}}>
        <AppBar position = "static">
            <Toolbar>
                <Typography 
                    variant="h2" 
                    noWrap
                    component="div" 
                >    
                {links[0]}
                </Typography>
                <Button color='inherit'>{links[1]}</Button>
                <Button color='inherit'>{links[2]}</Button>
                <Button color='inherit'>{links[3]}</Button>
                <Button color='inherit'>{links[4]}</Button>
                {/* <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase */}
                    {/* placeholder = "Search..."
                    inputProps={{ 'aria-label': 'search'}} */}
                    {/* /> */}
                {/* </Search>  */}
            </Toolbar>
        </AppBar>
        </Box>
    );
}
