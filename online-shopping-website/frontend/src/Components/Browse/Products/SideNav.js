import propTypes from 'prop-types';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { Card } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SearchBar } from './SearchBar';
import { Stack } from '@mui/material';

export const SideNav = (props) => {
    return (
        <Card sx={{ backgroundColor: 'rgb(62, 134, 62)', borderRadius: '10px', display: 'flex', justifyContent: 'center', padding: '1.5em', color: 'white'}}>
            <Stack xs={12} sx={{ width: '100%' }} spacing={1}>
                <SearchBar className="SearchBar" label={'Search Products'} style={searchBarStyle} filterData={props.filterProducts} filters={props.filters} />
                <PriceFilter unfilteredProducts={props.unfilteredProducts} onSliderChange={props.onSliderChange} />
                <BrandDropdown brands={props.brands} onCheckboxChange={props.onCheckboxChange} />
                <SellerDropdown sellers={props.sellers} onCheckboxChange={props.onCheckboxChange} />
            </Stack>
        </Card>
    );
}

// Styling search bar white for NavBar
const searchBarStyle = {
    '& label': { 
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    '& .MuiOutlinedInput-input': {
        color: 'white',
    },
}

const PriceFilter = (props) => {
    
    const valueToText = (value) => {
        return `${value}Ɖ`;
    }
    
    // Gets lowest price of all products
    const getLowestPrice = (products) => {
        return Math.min.apply(Math, products.map((product) => { return product.price; }));
    }
    
    // Gets highest price of all products
    const getHighestPrice = (products) => {
        return Math.max.apply(Math, products.map((product) => { return product.price; }));
    }
    
    const lowestPrice = getLowestPrice(props.unfilteredProducts);
    const highestPrice = getHighestPrice(props.unfilteredProducts);
    // Labels to show under slider range
    const marks = [
        {
            value: lowestPrice,
            label: valueToText(lowestPrice),
        },
        {
            value: highestPrice,
            label: valueToText(highestPrice),
        },
    ];

    const [value, setValue] = React.useState([lowestPrice, highestPrice]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onSliderChange(newValue);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, padding: '1rem', margin: 0 }}>
            <Typography>Filter by price:</Typography>
            <Typography>{value[0]}Ɖ - {value[1]}Ɖ</Typography>
            <div style={{ paddingInline: '0.75rem' }}>
                <Slider
                    className='TextPink'
                    getAriaLabel={() => 'Price range'}
                    min={lowestPrice}
                    max={highestPrice}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valueToText}
                    step={1}
                    marks={marks}
                    disableSwap
                />
            </div>
        </Box>
    );
}

const BrandDropdown = (props) => {
    const handleChange = (event) => {
        props.onCheckboxChange('Brand', event.target.name, event.target.checked);
    };

    const iterateBrands = (props) => {
        return props.brands.map((brand,index) => {
            return (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <FormControlLabel
                        label={brand.name}
                        control={<Checkbox sx={{ '&.Mui-checked': { color: 'rgb(60, 121, 60)' } }}
                                           defaultChecked onChange={handleChange} name={brand.name} />}
                    />
                </Box>
            );
        });
    }

    return (
        <div className="accordion-width">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Brands</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {iterateBrands(props)}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const SellerDropdown = (props) => {
    const handleChange = (event) => {
        props.onCheckboxChange('Seller', event.target.name, event.target.checked);
    };

    const iterateSellers = (props) => {
        return props.sellers.map((seller, index) => {
            return (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <FormControlLabel
                        label={seller.sellerName}
                        control={
                            <Checkbox
                                sx={{ '&.Mui-checked': { color: 'rgb(60, 121, 60)' } }}
                                defaultChecked
                                onChange={handleChange}
                                name={seller.sellerName}
                            />
                        }
                    />
                </Box>
            );
        });
    }
    return (
        <div className="accordion-width">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Sellers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {iterateSellers(props)}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

// Checking prop types
SideNav.propTypes = {
    unfilteredProducts: propTypes.arrayOf(propTypes.object),
    filterProducts: propTypes.func,
    filters: propTypes.shape({
        searchQuery: propTypes.string
    }),
    onSliderChange: propTypes.func,
    onCheckboxChange: propTypes.func,
    brands: propTypes.arrayOf(propTypes.object),
    sellers: propTypes.arrayOf(propTypes.object),
}

PriceFilter.propTypes = {
    unfilteredProducts: propTypes.arrayOf(propTypes.object),
    onSliderChange: propTypes.func
}

BrandDropdown.propTypes = {
    onCheckboxChange: propTypes.func,
    brands: propTypes.arrayOf(propTypes.object),
}

SellerDropdown.propTypes = {
    onCheckboxChange: propTypes.func,
    sellers: propTypes.arrayOf(propTypes.object),
}