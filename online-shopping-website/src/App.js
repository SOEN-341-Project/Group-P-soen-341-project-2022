import './App.css';
import Grid from '@mui/material/Grid';
import {ProductGrid} from './Components/ProductGrid';
import {SideNav} from './Components/SideNav';
import Products from './TestValues.json';
import Brands from './TestValues.json';
import Sellers from './TestValues.json';

function App() {
    return (
        <div className="AppContent">
            <h1>
                Bobble
            </h1>
            <Grid container columnSpacing={4} rowSpacing={5}>
                <Grid item md={3} lg={2}>
                    <SideNav brands={Brands} sellers={Sellers}/>
                </Grid>
                <Grid item sm={11} md={9} lg={10}>
                    <ProductGrid products={Products}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
