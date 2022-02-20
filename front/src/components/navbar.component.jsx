import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return ( <
            nav className = "navbar navbar-expand-md navbar-dark bg-dark fixed-top " >
           <Link to="/createmap" className="navbar-brand">META CENTRALAND</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/signin" className="nav-link">LOG-IN</Link>
          </li>
          <li className="navbar-item">
          <Link to="/signup" className="nav-link">SIGN-UP</Link>
          </li>
          <li className="navbar-item">
          <Link to="/logout" className="nav-link">LOG-OUT</Link>
          </li>
          <li className="navbar-item">
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}