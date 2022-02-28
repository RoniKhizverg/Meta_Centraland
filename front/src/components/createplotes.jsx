import React, { useEffect } from 'react'

import axios from 'axios';


const CreatePlots = () => {
localStorage.setItem("legend",1);

    
   
useEffect(() => {  //creating the all plots
    
    const createPlots = async () =>{
    await (axios.post('http://localhost:4000/plots/plots', { userid: localStorage.getItem("loguserid") }));
    window.location="/createmap"

        };
    
    createPlots();

},[]);

  



return(  
    <div>
    </div>
)
}



export default CreatePlots