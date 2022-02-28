import React, { useEffect } from 'react'
import axios from 'axios';

const LogOut = () => {


    useEffect(() => {
       
    const logOut = async () =>
    {
       let userId = localStorage.getItem('user_id');
      localStorage.clear();
      await(axios.delete('http://localhost:4000/logsIn/'+ userId)) //delete the user from the log'ins list
        .then(res => console.log(res.data));
        
        window.location="/createmap"
    }
    logOut();
  },[]);
return(
  <div></div>
)
    }

export default LogOut
      
  

