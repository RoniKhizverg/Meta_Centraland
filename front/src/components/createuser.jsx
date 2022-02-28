import React, { useEffect } from 'react'

import axios from 'axios';



const CreateUser = () => {

       
useEffect(() => {  //creating the all plots

const createUser = async () =>{ //create the register user- 'admin'
       
     const newUser = {
      name: "O&R.Ltd",
      ID: "123456789",
       password: "123",
       wallet:1000

    }  
    localStorage.setItem("loguserid", newUser.ID);
    
      await(axios.post('http://localhost:4000/signupUsers/signup',newUser))
        .then(res => console.log(res.data));

      window.location="/createplots"
    }
    createUser();

},[])
return(
   <div></div>
)
}
export default CreateUser;