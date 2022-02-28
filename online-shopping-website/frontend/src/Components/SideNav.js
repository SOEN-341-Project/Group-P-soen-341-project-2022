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
import Products from '../TestValues.json';
import { SearchBar } from './SearchBar';
import { Stack } from '@mui/material';

export const SideNav = (props) => {
    return (
        <Stack xs={12}>
            <SearchBar className="SearchBar" filterProducts={props.filterProducts} filters={props.filters}/>
            <PriceFilter onSliderChange={props.onSliderChange} />
            <BrandDropdown brands={props.brands} onCheckboxChange={props.onCheckboxChange} />
            <SellerDropdown sellers={props.sellers} onCheckboxChange={props.onCheckboxChange} />
        </Stack>
    );
}

const PriceFilter = (props) => {
    function valuetext(value) {
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

    // Sets lowest and highest prices to show on price slider
    const lowestPrice = getLowestPrice(Products.products);
    const highestPrice = getHighestPrice(Products.products);
    
    // Labels to show under slider range
    const marks = [
        {
            value: lowestPrice,
            label: valuetext(lowestPrice),
        },
        {
            value: highestPrice,
            label: valuetext(highestPrice),
        },
    ];

    // const minDistance = 0;
    const [value, setValue] = React.useState([lowestPrice, highestPrice]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onSliderChange(value);
    };
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', ml: 3, width: 140, paddingTop:'1rem',}}>
            <Typography>Filter by price:</Typography>
            <Typography>{value[0]}Ɖ - {value[1]}Ɖ</Typography>
            <Slider
                className='SideNavPriceFilter'
                getAriaLabel={() => 'Price range'}
                min={lowestPrice}
                max={highestPrice}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                step={1}
                marks={marks}
                disableSwap
            />
        </Box>
    );
}

const BrandDropdown = (props) => {
    return (
        <div className="accordion-width">
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
        <div className="accordion-width">
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
    const handleChange = (event) => {
        props.onCheckboxChange('Brand', event.target.name, event.target.checked);
    };

    function iterateSellers(props) {
        return props.brands.map((brand,index) => {
            return (
                <Box key={index} sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                    <FormControlLabel
                        label={brand}
                        control={<Checkbox defaultChecked onChange={handleChange} name={brand} />}
                    />
                </Box>
            );
        });
    }

    return (
        <div>
            {iterateSellers(props.brands)}
        </div>
    );
}

function SellersCheckbox(props) {
    const handleChange = (event) => {
        props.onCheckboxChange('Seller', event.target.name, event.target.checked);
    };

    function iterateSellers(props) {
        return props.sellers.map((seller, index) => {
            return (
                <Box key={index} sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                    <FormControlLabel
                        label={seller}
                        control={<Checkbox defaultChecked onChange={handleChange} name={seller} />}
                    />
                </Box>
            );
        });
    }

    return (
        <div>
            {iterateSellers(props.sellers)}
        </div>
    );
}