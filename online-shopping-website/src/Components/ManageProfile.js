import React from "react";
import { BrowserRouter , Route, Redirect, Routes} from 'react-router-dom';
import Home from './Home/Home';
import Name from './Name';
import Username from "./Username/Username";
import Password from "./Password/Password";
import Address from "./Address/Address";
import Email from "./Email/Email";
import DeleteAcc from "./Delete/DeleteAcc";
import ProfileNavbar from "./Components/ProfileNavber";

export const ManageProfile = () =>{
  return(
    <Routes>
      <ProfileNavbar/>
      <main>
        <h1>Manage Profile</h1>
          <Route path="/name" element={<Name/>} />

          <Route path="/username" element={<Username/>} />

          <Route path="/password" element={<Password/>} />

          <Route path="/address" element={<Address/>} />

          <Route path="/email" element={<Email/>} />

          <Route path="/deleteAcc" element={<DeleteAcc/>} />
        
      </main>
    </Routes>
  );
}

export default ManageProfile;
