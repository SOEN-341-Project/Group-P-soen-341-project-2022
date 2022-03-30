import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import axios from 'axios';

export const ProfilePage = () => {
    const [editable, setEditable] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userCookie, setUserCookie] = useCookies(["user"]);

    const handleSubmit = async (event) => {
        const updateProfileResponse = await axios.post(
            process.env.REACT_APP_DB_CONNECTION + "/api/users/update",
            userData,
            {
                headers: {
                    'Authorization': `Bearer ${userCookie.user.token}`
                }
            }
        );
        setUserCookie("user", updateProfileResponse.data);
    }

    console.log(userCookie);
    return (
        <Grid item container xs={12} className='ProfileContainer'>
            <Grid item xs={8}>
                <h1>My Profile</h1>
            </Grid>
            <Grid item xs={4} sx={{ paddingTop: '1rem' }}>
                <Button onClick={() => { setEditable(true) }} style={{ float: 'right' }} variant="contained"
                    className="GreenButtonContained EditProfileButtonLarge"><EditIcon /> Edit
                    Profile
                </Button>
                <Button onClick={() => { setEditable(true) }} style={{ float: 'right' }} variant="contained"
                    className="GreenButtonContained EditProfileButtonSmall"><EditIcon />
                </Button>
            </Grid>
            <Grid item xs={12} className='ProfileInfoContainer'>
                {userCookie.user.user.firstName && userCookie.user.user.lastName && (
                    <div>
                        <h2 className="ProfileInfoHeader" style={{ marginTop: '1rem' }}>Full name</h2>
                        <Typography className="ProfileInfoText">{userCookie.user.user.firstName + " " + userCookie.user.user.lastName}</Typography>
                    </div>
                )}

                {userCookie.user.user.username && (
                    <div>
                        <h2 className="ProfileInfoHeader">Username</h2>
                        <Typography className="ProfileInfoText">{userCookie.user.user.username}</Typography>
                    </div>
                )}

                <h2 className="ProfileInfoHeader">Email</h2>
                <Typography className="ProfileInfoText">{userCookie.user.user.email}</Typography>

                {userCookie.user.user.address1 && (
                    <div>
                        <h2 className="ProfileInfoHeader">Address</h2>
                        <Typography className="ProfileInfoText">{userCookie.user.user.address1}</Typography>
                    </div>
                )}
            </Grid>
        </Grid>
    )
}