import * as React from 'react';
import { useState } from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const ProfilePage = () => {
    const [editable, setEditable] = useState(false);
    const [cookie, setCookie] = useCookies(["user"]);
    const [userData, setUserData] = useState(cookie.user.user);
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        let updateProfileResponse;
        try {
            updateProfileResponse = await axios.post(
                process.env.REACT_APP_DB_CONNECTION + "/api/users/update",
                {
                    ...userData,
                    oldPassword: password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${cookie.user.token}`
                    }
                }
            );
        }
        catch (err) {
            window.alert(
                err.response.data.error + ".\n" +
                (err.response.data.message ? err.response.data.message + "." : ""));
        }

        setCookie("user", updateProfileResponse.data);
        setEditable(false);
    }

    return (
        <div>
            <Link to="/" className='RoutingLink'>
                <Button variant="text" className="ProductsBackButton">
                    <ArrowBackIosNewIcon /><h4>Return to products</h4>
                </Button>
            </Link>
            <Grid item container xs={12} className='ProfileContainer'>
                <Grid item xs={8}>
                    <h1>My Profile</h1>
                </Grid>
                <Grid item xs={4} sx={{ paddingTop: '1rem' }}>
                    <Button onClick={() => {
                        setEditable(!editable)
                    }} style={{ float: 'right' }} variant="contained"
                        className="GreenButtonContained EditProfileButtonLarge">
                        {editable ? (<CloseIcon />) : (<EditIcon />)}
                        {editable ? 'Cancel Edit' : 'Edit Profile'}
                    </Button>
                    <Button onClick={() => {
                        setEditable(!editable)
                    }} style={{ float: 'right' }} variant="contained"
                        className="GreenButtonContained EditProfileButtonSmall">
                        {editable ? (<CloseIcon />) : (<EditIcon />)}
                    </Button>
                </Grid>
                <Grid item xs={12} className='ProfileInfoContainer'>
                    <form onSubmit={handleSubmit}>
                        {/*First name*/}
                        <h2 className="ProfileInfoHeader" style={{ marginTop: '1rem' }}>First name</h2>
                        <TextField className="ProfileTextField"
                            placeholder="First name"
                            variant="outlined"
                            disabled={!editable}
                            inputProps={{
                                pattern: "([A-ZÀ-ÿ][-,a-zà-ÿ. ']+[ ]*)+",
                                title: 'Name must be alphabetical characters only.'
                            }}
                            value={userData.firstName ? userData.firstName : ''}
                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />

                        {/*Last name*/}
                        <h2 className="ProfileInfoHeader">Last name</h2>
                        <TextField className="ProfileTextField"
                            placeholder="Last name"
                            variant="outlined"
                            disabled={!editable}
                            inputProps={{
                                pattern: "([A-ZÀ-ÿ][-,a-zà-ÿ. ']+[ ]*)+",
                                title: 'Name must be alphabetical characters only.'
                            }}
                            value={userData.lastName ? userData.lastName : ''}
                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />

                        {/*Email*/}
                        <h2 className="ProfileInfoHeader">Email</h2>
                        <TextField sx={{ paddingBottom: '1.5rem' }}
                            className="ProfileTextField"
                            disabled={!editable}
                            required
                            inputProps={{
                                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]+$",
                                title: "username@domain"
                            }}
                            placeholder="someone@domain.com" variant="outlined" value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })} />

                        {/*Username*/}
                        <h2 className="ProfileInfoHeader">Username</h2>
                        <TextField sx={{ paddingBottom: '1.5rem' }}
                            className="ProfileTextField"
                            variant="outlined"
                            placeholder="username"
                            disabled={!editable}
                            value={userData.username ? userData.username : ''}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })} />

                        {/* Change password */}
                        <h2 className="ProfileInfoHeader">Change Password</h2>

                        {/* Old Password */}
                        <TextField variant='outlined' placeholder='Old Password'
                            className="ProfileTextField"
                            disabled={!editable}
                            style={{ marginBottom: '2rem' }}
                            onChange={(e) => setPassword(e.target.value)} />

                        <hr />

                        {/* New Password */}
                        <TextField
                            required
                            className="ProfileTextField"
                            style={{ margin: '1.5rem 0 1rem 0' }}
                            // type='password'
                            disabled={!editable}
                            placeholder='New Password'
                            inputProps={{
                                pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+|:;<>,.?/~(){}\\[\\]\\\\-]).{8,}$',
                                title: 'Password must follow this format: - At least one digit - At least one lowercase character - At least one uppercase character - At least one special character'
                            }}
                            variant="outlined"
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

                        <TextField
                            value = {userData.confPassword}
                            disabled={!editable}
                            required
                            className="ProfileTextField"
                            // type = 'password'
                            placeholder="Confirm New Password" variant="outlined"
                            onChange={(e) => setUserData({ ...userData, confPassword: e.target.value })} 
                        />

                        {/*Address*/}
                        <h2 className="ProfileInfoHeader">Shipping Address</h2>
                        <TextField className="ProfileTextField"
                            style={{ marginBottom: "1rem" }}
                            variant="outlined"
                            required multiline
                            placeholder="address"
                            value={userData.address1}
                            disabled={!editable}
                            onChange={(e) => setUserData({ ...userData, address1: e.target.value })} />

                        {/*Save button*/}
                        {editable && (
                            <div style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>
                                <Button type="submit" value="Sign Up" variant="contained" className='GreenButtonContained'
                                    sx={{ maxWidth: '10rem' }}>Save changes</Button>
                            </div>
                        )}
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}