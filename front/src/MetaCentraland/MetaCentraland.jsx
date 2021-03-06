import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../components/navbar.component"
import Createmap from "../components/createmap.component";
import Login from "../components/login";
import FunctionSignUp from "../components/signup";
import CreatePlots from "../components/createplotes";
import CreateUser from "../components/createuser";
import BuyerPopUp from "../components/buyerplotpopup";
import SellerPopUp from "../components/sellerpopup";
import GuestPopUp from "../components/guestpopup";
import LogOut from "../components/logout";
import ShowPlots from "../components/showplots";

function MetaCentraland() { //deifne each route and the exact path
  return (
    <BrowserRouter>
    <div className="MetaCentraland">
    <Navbar />
      <br/>
      <Routes>
     
    <Route exact path="/"  element={<CreateUser/>}> </Route>
        <Route exact path="/signin"  element={<Login/>}> </Route>
        <Route exact path="/signup"  element={<FunctionSignUp/>}> </Route>
        <Route exact path="/createmap"  element={<Createmap/>}> </Route>
        <Route exact path="/createplots"  element={<CreatePlots/>}> </Route>
        <Route exact path="/buyerplotpopup"  element={<BuyerPopUp/>}> </Route>
        <Route exact path="/sellerpopup"  element={<SellerPopUp/>}> </Route>
        <Route exact path="/guestpopup"  element={<GuestPopUp/>}> </Route>
        <Route exact path="/logout"  element={<LogOut/>}> </Route>
        <Route exact path="/showPlots"  element={<ShowPlots/>}> </Route>

    </Routes>
    </div>
  </BrowserRouter>
  );
}
export default MetaCentraland;