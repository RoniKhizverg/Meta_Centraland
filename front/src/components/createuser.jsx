import React from 'react'

import axios from 'axios';



export default class CreatePlots extends React.Component {

constructor(props) {

        super(props);
      
        this.state = {
           user:this.createuser()
        
        }

    }


createuser()
    {
       
   const newUser = {
      name: "O&R.Ltd",
      ID: "123456789",
       userType: "Seller",
       password: "123",
       wallet:1000

    }  
    localStorage.setItem("userid", newUser.ID);
    
      axios.post('http://localhost:4000/signupUsers/signup',newUser)
        .then(res => console.log(res.data));
    }
    render() {
return(
   <div>{window.location="/createplots"}</div>
)
    }
}