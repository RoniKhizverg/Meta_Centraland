import React, { useState,useEffect } from 'react'
import { Grid, Paper, Avatar, Typography,Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import axios from 'axios';
import CreateMap from './createmap.component'
import '../MetaCentraland/MetaCentraland.css'
import {
    Link
} from 'react-router-dom';
localStorage.setItem("legened",1);
const GuestPopUp = () => {
 
  const[plot,setPlot] = useState('');
  const[linkToGame,setLinkToGame] = useState('');
  const[status,setStatus] = useState('');
  const[inputype,setInputype] = useState('hiddeninput');



       useEffect(() => {
        


         const plot_id = localStorage.getItem("plot");
         axios.get('http://localhost:4000/plots').then((response) => {
         const data = response.data;
         const length = data.length;
        for(var i=0; i < length; i++)
        {
          if(data[i]._id === plot_id)
          {
            setPlot(
          data[i]
        )
        console.log(data[i].linkToGame)
        if(data[i].linkToGame != null && data[i].linkToGame != "")
        {
            setLinkToGame(
          data[i].linkToGame
        )

        setInputype(
        "validinput"
        )
        console.log(inputype)
        }
        else{
          setInputype(
        "hiddeninput"
        )

        }
        if(data[i].avaibleForSale === true)
        {

        setStatus(
         "For sale"
        )
    }
     else
    {
      setStatus(
      "No for sale"
        )
    }
      }
          }
       
 })
},[]);
      

      const handleSubmit = event => {
        event.preventDefault();

   if(plot.linkToGame !=null)
   {
       console.log(plot.linkToGame.toString())
      window.location.href = plot.linkToGame.toString()
   }
  
  }
  
    
    const paperStyle = { padding: 20,top:10000,height: 500, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
            console.log(inputype)
    return (
      
        <div className="image">
    <img src="plotWorld.png" ></img>
            

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Dialog open >
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Plot details</h2>
                    <br></br>
                    <Typography variant='caption' gutterBottom>Status:{status} </Typography>
            <br></br>
                    <Typography variant='caption' gutterBottom>Description:{plot.description} </Typography>
                
                <form onSubmit={handleSubmit}>
                    <Typography variant='caption' gutterBottom>Plot price:{plot.price} </Typography>

                    <br></br>

                      <Typography variant='caption' gutterBottom>Owner name:{plot.ownerName} </Typography>
                                             
                        <div>
        <br></br>
        </div>
        <input className={inputype} type="submit" value="play game" ></input>
         
         <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>


                <Link to="/createmap" className="btn btn-primary">close</Link>
                </form>
                                </Grid>

            </Paper>
        </Dialog>
        </div>
    )
    }

export default GuestPopUp