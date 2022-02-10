import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

//import Navbar from "./components/navbar.component"
import createMap from "../components/createMap.component";
// import EditExercise from "./components/edit-exercise.component";
// import CreateExercise from "./components/create-exercise.component";
// import CreateUser from "./components/create-user.component";

function MetaCentraland() {
  return (
    <Router>
      <div className="container">
      <br/>
      <Route path="/" exact component={createMap} />
      
      </div>
    </Router>
  );
}

export default MetaCentraland;