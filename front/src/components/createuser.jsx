import React, { useState } from 'react'

import axios from 'axios';



const CreateUser = () => {

    const [user] = useState(createuser);
       

    


function createuser()
    {
       
     const newUser = {
      name: "O&R.Ltd",
      ID: "123456789",
       userType: "seller",
       password: "123",
       wallet:1000

    }  
    localStorage.setItem("loguserid", newUser.ID);
    
      axios.post('http://localhost:4000/signupUsers/signup',newUser)
        .then(res => console.log(res.data));
    }
return(
   <div>{window.location="/createplots"}</div>
)
}
export default CreateUser;