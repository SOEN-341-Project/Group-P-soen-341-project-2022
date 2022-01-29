import Grid from '@mui/material/Grid';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const SideNav = (props) => {
    const marks = [
        {
            value: 0,
            label: '0Ɖ',
        },
        {
            value: 50,
            label: '50Ɖ',
        },
        {
            value: 100,
            label: '100Ɖ',
        },
    ];

    function valuetext(value) {
        return `${value}Ɖ`;
    }

    const minDistance = 10;
    const [value, setValue] = React.useState([0, 100]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue);
        }
    };

    return (
        <Grid container xs={5} sm={4} md={4} lg={3}>
            <Grid item spacing={6} xs={5} sm={4} md={4} lg={3}>
                <Box  sx={{display: 'flex', flexDirection: 'column', ml: 3, width: 140}}>
                    <Typography>Price Range: </Typography>
                    <Typography>{value[0]}Ɖ - {value[1]}Ɖ</Typography>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        step={10}
                        marks={marks}
                        disableSwap
                    />
                </Box>
            </Grid>
            <BrandDropdown brands={props.brands}/>
            <SellerDropdown sellers={props.sellers}/>
        </Grid>
    );
}

const BrandDropdown = (props) => {
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