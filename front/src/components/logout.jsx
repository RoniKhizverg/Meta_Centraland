import React, { useState } from 'react'
import axios from 'axios';

const LogOut = () => {


    const [user] = useState(logout);
       


function logout()
    {
       let userId = localStorage.getItem('user_id');
       console.log(localStorage.getItem('user_id'))
      localStorage.clear();
      axios.delete('http://localhost:4000/logsIn/'+ userId)
        .then(res => console.log(res.data));
    }
return(
  <div>{window.location="/createmap"}</div>
)
    }

export default LogOut
      
  

