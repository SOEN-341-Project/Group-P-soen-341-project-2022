import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const profileProperties = {
    id: 0,
    email: '',
    username: '',
    role: '',
    password: 'alksdjfkjdsf',
    firstName: '',
    lastName: '',
    address1: '',
}



export const Register = () => {
    
    
    const [values, setValues] = useState(profileProperties);

    const handleChange = (event) => {
        
        setValues({})
    }

    const processRegister = (event) => {
        event.preventDefault();
        // const fs = require('fs');
        // let usersjson = fs.readFileSync("Testingthing.json","utf-8");
        // let users = JSON.parse(usersjson);
        // users.push(values);
        // usersjson = JSON.stringify(users);
        // fs.writeFileSync("Testingthing.json",usersjson, "utf-8");
        // //append to JSON file
    }

    return (
        <div className='register-page'>
            <form onSubmit={processRegister} className='sign-up'>
                <Stack spacing={2}>
                    <TextField className='textfield-register' id="outlined-required" label="First name" variant="outlined" value={values.firstName}/>
                    <TextField id="outlined-required" label="Last name" variant="outlined" value={values.lastName}/>
                    <TextField placeholder="username@gmail.com" id="outlined-required" label="Email" variant="outlined" value={values.email}/>
                    <TextField id="outlined-required" label="Username" variant="outlined" value={values.username}/>
                    <TextField id="outlined-password-input" type="password" label="Password" variant="outlined" />
                    <TextField placeholder="1455 Boulevard de Maisonneuve O, Montréal, QC" id="outlined-basic" label="Address" variant="outlined" value={values.firstName}/>
                    <input type="submit" value="Submit"/>
                </Stack>
            </form>
        </div>
    )
}