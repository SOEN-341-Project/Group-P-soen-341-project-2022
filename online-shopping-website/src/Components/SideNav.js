import Grid from '@mui/material/Grid';
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardHeader from '@mui/material/CardHeader';

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

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
        <Card sx={{maxWidth: 345}} xs={3} sm={3} lg={3}>
            <CardActions disableSpacing>
                Brands
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{iterateBrands(props.brands)}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

const SellerDropdown = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{maxWidth: 345}}>
            <CardActions disableSpacing>
                Sellers
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{iterateSellers(props.sellers)}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
