import * as React from 'react';
import {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import {useCookies} from 'react-cookie';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export const ProfilePage = () => {
    const [editable, setEditable] = useState(false);
    const [cookie, setCookie] = useCookies(["user"]);
    const [userData, setUserData] = useState(cookie.user.user);

    const handleSubmit = async (event) => {
        const updateProfileResponse = await axios.post(
            process.env.REACT_APP_DB_CONNECTION + "/api/users/update",
            userData,
            {
                headers: {
                    'Authorization': `Bearer ${cookie.user.token}`
                }
            }
        );
        setCookie("user", updateProfileResponse.data);
        setEditable(false);
    }

    // console.log(userCookie);
    console.log(userData);
    return (
        <Grid item container xs={12} className='ProfileContainer'>
            <Grid item xs={8}>
                <h1>My Profile</h1>
            </Grid>
            <Grid item xs={4} sx={{paddingTop: '1rem'}}>
                <Button onClick={() => {
                    setEditable(true)
                }} style={{float: 'right'}} variant="contained"
                        className="GreenButtonContained EditProfileButtonLarge"><EditIcon/> Edit
                    Profile
                </Button>
                <Button onClick={() => {
                    setEditable(true)
                }} style={{float: 'right'}} variant="contained"
                        className="GreenButtonContained EditProfileButtonSmall"><EditIcon/>
                </Button>
            </Grid>
            <Grid item xs={12} className='ProfileInfoContainer'>
                <form onSubmit={handleSubmit}>
                    {/*First name*/}
                    <h2 className="ProfileInfoHeader" style={{marginTop: '1rem'}}>First name</h2>
                    <TextField className="ProfileTextField"
                               placeholder="First name"
                               variant="outlined"
                               disabled={!editable}
                               value={userData.firstName ? userData.firstName : ''}
                               onChange={(e) => setUserData({...userData, firstName: e.target.value})}/>

                    {/*Last name*/}
                    <h2 className="ProfileInfoHeader">Last name</h2>
                    <TextField className="ProfileTextField"
                               placeholder="Last name"
                               variant="outlined"
                               disabled={!editable}
                               value={userData.lastName ? userData.lastName : ''}
                               onChange={(e) => setUserData({...userData, lastName: e.target.value})}/>

                    {/*Email*/}
                    <h2 className="ProfileInfoHeader">Email</h2>
                    <TextField sx={{paddingBottom: '1.5rem'}}
                               className="ProfileTextField"
                               disabled={!editable}
                               required
                               inputProps={{pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]+$", title: "username@domain"}}
                               placeholder="someone@domain.com" variant="outlined" value={userData.email}
                               onChange={(e) => setUserData({...userData, email: e.target.value})}/>

                    {/*Username*/}
                    <h2 className="ProfileInfoHeader">Username</h2>
                    <TextField sx={{paddingBottom: '1.5rem'}}
                               className="ProfileTextField"
                               variant="outlined"
                               placeholder="username"
                               disabled={!editable}
                               value={userData.username ? userData.username : ''}
                               onChange={(e) => setUserData({...userData, username: e.target.value})}/>

                    {/*Address*/}
                    <h2 className="ProfileInfoHeader">Shipping Address</h2>
                    <TextField className="ProfileTextField"
                               variant="outlined"
                               required multiline
                               placeholder="address"
                               value={userData.address1}
                               disabled={!editable}
                               onChange={(e) => setUserData({...userData, address1: e.target.value})}/>

                    {/*Save button*/}
                    <div style={{textAlign: 'center', margin: '2rem 0 1rem 0'}}>
                        <Button type="submit" value="Sign Up" variant="contained" className='GreenButtonContained'
                                sx={{maxWidth: '10rem'}} onClick={handleSubmit}>Save changes</Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}