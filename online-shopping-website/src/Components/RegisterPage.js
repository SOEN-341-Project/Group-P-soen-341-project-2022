import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';


const profileProperties = {
    email: '',
    username: '',
    role: 'CUSTOMER',
    password: '',
    firstName: '',
    lastName: '',
    streetNb: '',
    streetName: '',
    city: '',
    province: '',
    sellerName: '',
}


export const Register = () => {

    const [seller, setSeller] = useState(false);

    const [values, setValues] = useState(profileProperties);

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

    const processRegister = (event) => {
        event.preventDefault();
        // setValues((state) => {
        //     return {...values, address1: address}
        // });
        outputProfile();
    }

    const outputProfile = () => {
        console.log(values.email + '\n' + values.username
            + '\n' + values.role + '\n' + values.password + '\n' + values.firstName + '\n'
            + values.lastName + '\n' + values.streetNb + '\n' + values.streetName + '\n' + values.city + '\n' + values.province +'\n' + values.sellerName);
    }

    return (
        <div className='register-page'>
            <form onSubmit={processRegister} className='sign-up'>
                <Stack spacing={2}>
                    <TextField className='textfield-register' label="First name" variant="outlined" value={values.firstName} onChange={(e) => setValues({ ...values, firstName: e.target.value })} />
                    <TextField label="Last name" variant="outlined" value={values.lastName} onChange={(e) => setValues({ ...values, lastName: e.target.value })} />
                    <TextField required type="email" label="Email" variant="outlined" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    <TextField label="Username" variant="outlined" value={values.username} onChange={(e) => setValues({ ...values, username: e.target.value })} />
                    <TextField required type="password" label="Password" variant="outlined" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
                    <TextField required type="password" label="Password" variant="outlined" inputProps={{ pattern: '^' + values.password + '$', title: 'Passwords do not match' }} />
                    <br/><label>Shipping address:</label><br/>
                    <TextField required inputProps={{ pattern: '^[0-9]+$', title: 'Input must be a number' }} label="Street number" variant="outlined" value={values.streetNb} onChange={(e) => setValues({...values, streetNb: e.target.value})} />
                    <TextField required inputProps={{ pattern: '^[A-Za-z0-9 ]+$', title: 'Valid Characters: A-Z, a-z, 0-9' }} label="Street name" variant="outlined" value={values.streetName} onChange={(e) => setValues({ ...values, streetName: e.target.value})} />
                    <TextField required inputProps={{ pattern: '^[A-Za-z0-9 ]+$', title: 'Valid Characters: A-Z, a-z, 0-9' }} label="City" variant="outlined" value={values.city} onChange={(e) => setValues({ ...values, city: e.target.value})} />
                    <TextField required inputProps={{ pattern: '^[A-Za-z0-9 ]+$', title: 'Valid Characters: A-Z, a-z, 0-9' }} label="Province" variant="outlined" value={values.province} onChange={(e) => setValues({ ...values, province: e.target.value})} />
                    <FormLabel>Role</FormLabel>
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