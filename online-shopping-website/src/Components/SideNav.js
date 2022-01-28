import Grid from '@mui/material/Grid';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const iterateBrands = (data) => {
    return data.brands.map(brand => {
        return (
            <Grid item>
                {brand}
            </Grid>
        );
    });
}

const iterateSellers = (data) => {
    return data.sellers.map(seller => {
        return (
            <Grid item>
                {seller}
            </Grid>
        );
    })
}

export const SideNav = (props) => {
    return (
        <Grid container spacing={2} rowspacing={2}>
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
                    <Typography paragraph>
                        {iterateBrands(props.brands)}
                    </Typography>
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
                    <Typography paragraph>
                        {iterateSellers(props.sellers)}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
