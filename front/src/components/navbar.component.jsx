import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';


export default class Navbar extends Component {
constructor(props) {

        super(props);
      
        this.state = {
           signIn:'visabiity',
           logIn: 'visabiity',
           logout: 'hiddeninput',
            user: [],

        }

    }
        componentDidMount() {

axios.get('http://localhost:4000/logsIn')
     .then((response) => {

         const data = response.data;
         var length = data.length;
         if(length===0 || !localStorage.getItem('loguserid'))
         {
            this.setState({user: "Welcome Guest"});
            this.setState({usertype: "guest"});


         }
         else{
             axios.get('http://localhost:4000/signupUsers')
     .then((response) => {
        const userid = localStorage.getItem('loguserid');
         const data1 = response.data;
         var length1 = data1.length;
         for(var i=0; i < length1; i++)
         {
            if(data1[i].ID === userid )
            {
                 this.setState({user: data1[i].name +" has " + data1[i].wallet + " $"} );
                 this.setState({usertype: data1[i].userType});
                 console.log(data1[i].userType)
            }
      }

   
  });
}
});


  axios.get('http://localhost:4000/logsIn')
     .then((response) => {

         const data = response.data;
         var length = data.length;
         if((length!==0) || (localStorage.getItem('loguserid')=== "null"))
         {
          this.setState({signIn: "hiddeninput"});
          this.setState({logIn: "hiddeninput"});
          this.setState({logout: "visabiity"})

         }
         else{
           this.setState({logout: "hiddeninput"})
           this.setState({signIn: "visabiity"});
          this.setState({logIn: "visabiity"});
         }
        })
      }

    render() {
     console.log(this.state.user)
        return ( <
            nav className = "navbar navbar-expand-md navbar-dark bg-dark fixed-top " >
           <Link to="/createmap" className="navbar-brand">META CENTRALAND</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className={this.state.logIn}>
          <Link to="/signin" className={"nav-link"}>LOG-IN</Link>
          </li>
          <li className={this.state.signIn}>
          <Link to="/signup" className="nav-link">SIGN-UP</Link>
          </li>
          <li className={this.state.logout}>
          <Link to="/logout" className="nav-link">LOG-OUT</Link>
          </li>

          <li className={"navbar-item"}>
          <div className="nav-link">{this.state.user}</div>
          </li>


          <li className="navbar-item">
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}