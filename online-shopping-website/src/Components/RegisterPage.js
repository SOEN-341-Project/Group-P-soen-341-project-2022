import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

//key-value pairs for profile components
const profileProperties = {
    email: '',
    username: '',
    role: 'CUSTOMER',
    password: '',
    confPassword: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    province: '',
    sellerName: '',
}

//signing up function
export const Register = () => {

    //if seller, turn true. else, turn false
    const [seller, setSeller] = useState(false);

    //state for profile components
    const [values, setValues] = useState(profileProperties);

    //function executes when user selects seller or customer through radio buttons
    const handleChange = (event) => {
        setValues({ ...values, role: event.target.value })
        if (event.target.value === 'CUSTOMER') {
            setSeller(false);
            setValues({ ...values, sellerName: '' })
        }
        else {
            setSeller(true);
        }
    }

    //when user clicks submits form
    const processRegister = (event) => {
        if(values.password !== values.confPassword) {
            event.preventDefault();
            outputProfile();
        }
    }

    //to test the profile prop values
    const outputProfile = () => {
        console.log(values.email + '\n' + values.username
            + '\n' + values.role + '\n' + values.password + '\n' + values.firstName + '\n'
            + values.lastName + '\n' + values.street + '\n' + values.city + '\n' + values.province +'\n' + values.sellerName);
    }

    return (
        <div className='register-page'>
            {/* sign up form */}
            <form onSubmit={processRegister} action="/" className='sign-up'>
                <Stack spacing={2}>
                    <p className="Sign-Up-Text">Sign Up</p>
                    <TextField className='textfield-register' label="First name" variant="outlined" value={values.firstName} onChange={(e) => setValues({ ...values, firstName: e.target.value })} />
                    <TextField label="Last name" variant="outlined" value={values.lastName} onChange={(e) => setValues({ ...values, lastName: e.target.value })} />
                    <TextField required inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]+$", title: "username@domain"}} label="Email" variant="outlined" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    <TextField label="Username" variant="outlined" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
                    <TextField required type="password" inputProps={{ pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+|:;<>,.?/~(){}\\[\\]\\\\-]).{8,}$', title: 'Password must follow this format: - At least one digit - At least one lowercase character - At least one uppercase character - At least one special character' }} label="Password" variant="outlined" value={values.password} onChange={(e) => setValues({...values, password: e.target.value})} />
                    <TextField required type="password" label="Confirm password" variant="outlined" value={values.confPassword} onChange={(e) => setValues({ ...values, confPassword: e.target.value})} error={values.confPassword !== values.password} helperText={values.confPassword !== values.password ? "Passwords do not match" : ''} />
                    <br/><label>Shipping address:</label><br/>
                    <TextField required inputProps={{ pattern: '^[0-9]+, [A-Za-z0-9 -]+$', title: '"Street Number, Street Name" Valid Characters: A-Z, a-z, 0-9' }} label="Street" variant="outlined" value={values.street} onChange={(e) => setValues({ ...values, street: e.target.value})} />
                    <TextField required inputProps={{ pattern: '^[A-Za-z0-9 -]+$', title: 'Valid Characters: A-Z, a-z, 0-9 and hyphen' }} label="City" variant="outlined" value={values.city} onChange={(e) => setValues({ ...values, city: e.target.value})} />
                    <TextField required inputProps={{ pattern: '^[A-Za-z0-9 -]+$', title: 'Valid Characters: A-Z, a-z, 0-9 and hyĥen' }} label="Province" variant="outlined" value={values.province} onChange={(e) => setValues({ ...values, province: e.target.value})} />
                    <FormLabel>Role</FormLabel>
                    {/* Radio buttons to handle customer/seller role selection */}
                    <RadioGroup
                        defaultValue="CUSTOMER"
                        name="controlled-radio-buttons-group"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="CUSTOMER" control={<Radio />} label="Customer" />
                        <FormControlLabel value="SELLER" control={<Radio />} label="Seller" />
                        <div>
                            {seller ? <TextField required label="Seller name" variant="outlined" value={values.sellerName} onChange={(e) => setValues({ ...values, sellerName: e.target.value })} /> : ''}
                        </div>
                    </RadioGroup>
                    <Button type="submit" value="Sign Up" variant="contained" id="SignUpButton">Sign Up</Button>
                </Stack>
            </form>
        </div>
    )
}