import './App.css';
import Grid from '@mui/material/Grid';
import {ProductGrid} from './Components/ProductGrid';
import {SideNav} from './Components/SideNav';
import NavBar from './Components/NavBar';
import Products from './TestValues.json';
import Brands from './TestValues.json';
import Sellers from './TestValues.json';

function App() {
    return (
        <div className="AppContent">
           <NavBar sx={<h1></h1>}/>
            <Grid container columnSpacing={4} rowSpacing={5}>
                <Grid item xs={12} md={2}>
                    <SideNav brands={Brands} sellers={Sellers}/>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                    <ProductGrid products={Products}/>
                </Grid>
            </Grid>
            
        </div>
    );
   
}

export default App;
