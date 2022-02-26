import React, { useState,useEffect } from 'react'

import axios from 'axios';


const CreatePlots = () => {
localStorage.setItem("legened",1);

    
   
useEffect(() => {
    
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