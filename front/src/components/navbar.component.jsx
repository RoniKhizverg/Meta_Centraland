import React, {
     useState,useEffect
} from 'react';
import {
    Link
} from 'react-router-dom';
import axios from 'axios';

    

const Navbar = () => {

const [signIn, setSignIn] = useState('visability');

const [logIn , setLogIn] = useState('visability');

const [logout , setLogOut] = useState('hiddeninput');

const [user , setUser] = useState('');


    
  useEffect(() => { //to write user details on the navbar
    axios.get('http://localhost:4000/logsIn')
     .then((response) => {
         const data = response.data;
         var length = data.length;
         if(length===0 || !localStorage.getItem('loguserid'))
         {
            setUser("Welcome Guest");

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
                 setUser(data1[i].name +" has " + data1[i].wallet + " $" );
            }
      }  
  });
}
});
},[]);



  axios.get('http://localhost:4000/logsIn') //define which a tag will be displayed on the Navbar 
     .then((response) => {

         const data = response.data;
         var length = data.length;
         if((length!==0) || (localStorage.getItem('loguserid')=== "null"))
         {
          setSignIn("hiddeninput");
          setLogIn("hiddeninput");
          setLogOut("visabiity")

         }
         else{
           setLogOut("hiddeninput")
           setSignIn("visabiity");
          setLogIn("visabiity");
         }
        })  
        return ( <
            nav className = "navbar navbar-expand-md navbar-dark bg-dark fixed-top " >
           <Link to="/createmap" className="navbar-brand">META CENTRALAND</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className={logIn}>
          <Link to  className={"nav-link"}onClick={()=>window.location="/signin"}>LOG-IN</Link>
          </li>
          <li className={signIn}>
          <Link to className="nav-link"onClick={()=>window.location="/signup"}>SIGN-UP</Link>
          </li>
          <li className={logout}>
          <Link to className="nav-link" onClick={()=>window.location="/logout"}>LOG-OUT</Link>
          </li>
          <li className={"navbar-item"}>
          <div className="navbar navbar-dark bg-dark">{user}</div>
          </li>


          <li className="navbar-item">
          </li>
        </ul>
        </div>
      </nav>
    );
    
}
  export default Navbar;

