import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import {useState} from "react";

export const ProfilePage = () => {
    const [editable, setEditable] = useState(false);

    //Temp user
    //TODO: Connect to backend to get user data (warning: date may need reformatting)
    const user = {
        firstName: 'Justin',
        lastName: 'Trudeau',
        email: 'j.turdeau@liberals.gov.ca',
        username: 'j.trudeau',
        role: 'CUSTOMER',
        address: 'Wellington St, Ottawa, ON K1A 0A9'
    }

    const EnableEditing = () => {
        setEditable(true);
        console.log('can edit now');
    }

    return (
        <Grid item container xs={12} className='ProfileContainer'>
            <Grid item xs={8}>
                <h1>My Profile</h1>
            </Grid>
            <Grid item xs={4} sx={{paddingTop: '1rem'}}>
                <Button onClick={EnableEditing} style={{float: 'right'}} variant="contained"
                        className="GreenButtonContained EditProfileButtonLarge"><EditIcon/> Edit
                    Profile
                </Button>
                <Button onClick={EnableEditing} style={{float: 'right'}} variant="contained"
                        className="GreenButtonContained EditProfileButtonSmall"><EditIcon/>
                </Button>
            </Grid>
            <Grid item xs={12} className='ProfileInfoContainer'>
                <h2 className="ProfileInfoHeader" style={{marginTop: '1rem'}}>Full name</h2>
                <Typography className="ProfileInfoText">{user.firstName + " " + user.lastName}</Typography>

                {user.username && (
                    <div>
                        <h2 className="ProfileInfoHeader">Username</h2>
                        <Typography className="ProfileInfoText">{user.username}</Typography>
                    </div>
                )}

                <h2 className="ProfileInfoHeader">Email</h2>
                <Typography className="ProfileInfoText">{user.email}</Typography>

                <h2 className="ProfileInfoHeader">Address</h2>
                <Typography className="ProfileInfoText">{user.address}</Typography>
            </Grid>
        </Grid>
    )
}