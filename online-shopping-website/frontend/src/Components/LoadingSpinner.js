import './LoadingSpinner.css'
import Grid from '@mui/material/Grid';

export const LoadingSpinner = (props) => {
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <h1 className="LoadingSpinnerHeader">{props.loadText}</h1>
            </Grid>
            <Grid item className="LoadingSpinner"/>
        </Grid>
    )
}