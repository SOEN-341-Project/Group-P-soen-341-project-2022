import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//import { Link } from "react-router-dom";

const links = ['Bobble','Menu','Cart','Sign In','Register'];
export default function navBar() {
    return (
        <Box sx={{ flexGrow: 1}}>
        <AppBar position = "static">
            <Toolbar>
                <Typography 
                    variant="h3" 
                    noWrap
                    component="div" 
                >    
                links[0];
                </Typography>
                <Button color='inherit'>links[1]</Button>
                <Button color='inherit'>links[2]</Button>
                <Button color='inherit'>links[3]</Button>
                <Button color='inherit'>links[4]</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
