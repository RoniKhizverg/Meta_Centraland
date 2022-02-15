import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../components/navbar.component"
import Createmap from "../components/createmap.component";
import Login from "../components/login";
import Signup from "../components/signup";
import CreatePlots from "../components/createplotes";
;





function MetaCentraland() {
  return (
    <BrowserRouter>
    <div className="container">
    <Navbar />
      <br/>
      <Routes>
     
    <Route exact path="/"  element={<CreatePlots/>}> </Route>
        <Route exact path="/signin"  element={<Login/>}> </Route>
        <Route exact path="/signup"  element={<Signup/>}> </Route>
        <Route exact path="/createmap"  element={<Createmap/>}> </Route>


    </Routes>
    </div>
  </BrowserRouter>
  );
}
export default MetaCentraland;