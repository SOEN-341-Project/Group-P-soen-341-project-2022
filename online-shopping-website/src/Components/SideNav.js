import Grid from '@mui/material/Grid';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const SideNav = (props) => {
    return (
        <Grid container xs={12} md={4} sm={4} lg={3}>
            <BrandDropdown brands={props.brands}/>
            <SellerDropdown sellers={props.sellers}/>
        </Grid>
    );
}

const BrandDropdown = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Brands</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {BrandsCheckbox(props)}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const SellerDropdown = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Sellers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {SellersCheckbox(props)}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

function BrandsCheckbox(props) {
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    // TODO: play with state to fix when checkboxes are checked
    function iterateBrands(props, checked) {
        return props.brands.map(brand => {
            return (
                <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                    <FormControlLabel
                        label={brand}
                        control={<Checkbox checked={checked[0]} onChange={handleChange2}/>}
                    />
                </Box>
            );
        });
    }

    return (
        <div>
            <FormControlLabel
                label="Select all"
                control={
                    <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                    />
                }
            />
            {iterateBrands(props.brands, checked)}
        </div>
    );
}

function SellersCheckbox(props) {
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    // TODO: play with state to fix when checkboxes are checked
    function iterateSellers(props, checked) {
        return props.brands.map(brand => {
            return (
                <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                    <FormControlLabel
                        label={brand}
                        control={<Checkbox checked={checked[0]} onChange={handleChange2}/>}
                    />
                </Box>
            );
        });
    }

    return (
        <div>
            <FormControlLabel
                label="Select all"
                control={
                    <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                    />
                }
            />
            {iterateSellers(props.sellers, checked)}
        </div>
    );
}