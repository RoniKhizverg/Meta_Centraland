import React, { useState,useEffect } from 'react';
import { Grid, Paper, Avatar, Typography, TextField,Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import '../MetaCentraland/MetaCentraland.css'
import {
    Link
} from 'react-router-dom';



localStorage.setItem("legened",1);
  const SellerPopUp =() => {

    const[plot,setPlot] = useState('');
    const[user,setUser] = useState('');
    const[price,setPrice] = useState('');
    const[avaibleForSale,setAvaibleForSale] = useState('');
    const[linkToGame,setLinkToGame] = useState('');
    const[status,setStatus] = useState('');
    const[inputype,setInputype] = useState('hiddeninput');
  
    useEffect(() => {
        
        const userId = localStorage.getItem("userid");
        axios.get('http://localhost:4000/signupUsers').then((response) => { 
         const data = response.data;
         const length = data.length;

        for(var i=0; i < length; i++)
        {
          if(data[i].ID === userId)
          {
        setUser(  //define the current user\seller
          data[i]
        )
      }
    }
  })

         const plot_id = localStorage.getItem("plot");
         axios.get('http://localhost:4000/plots').then((response) => {
         const data = response.data;
         const length = data.length;
        for(var i=0; i < length; i++)
        {
          if(data[i]._id === plot_id)
          {
            setPlot(   //define the current plot
          data[i]
        )
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
        const selleruserid= localStorage.getItem("loguserid");
        const plotOwnerId= localStorage.getItem("ownerNameId");

        if(selleruserid === plotOwnerId) 
        {
           setInputype(
        "validinput"
        )
        }
        else{
          setInputype(
         "hiddeninput"
        )
        }
  },[]);

   


        

   function onChangeavaibleForSale(e) {   //when we enters id its going to call this function
    if(e.target.value === "available for sale" )
        {
    setAvaibleForSale(      
      true     
    )
      console.log(avaibleForSale)

  }
  else{
       setAvaibleForSale(      
      false
          )
      console.log(avaibleForSale)

  }
}
   
 

  const handleSubmit = event => {
    event.preventDefault();

    let plotPrice='';
    if(!price) //the price isnt changed by the user so the price remains the same
    {
      plotPrice = plot.price;
    }
    else{  //update the price
      plotPrice =price;
    }

   let availablePlot='';
    if(avaibleForSale === "") //the plot's status isnt changed by the user so the status remains the same
    {
      availablePlot = plot.avaibleForSale;
    }
    else{
      availablePlot =avaibleForSale
    }
   const plotId = plot._id
   const updatePlot = {
      price: plotPrice,
      avaibleForSale: availablePlot,
      linkToGame: linkToGame
    }
    axios.patch('http://localhost:4000/plots/'+ plotId , updatePlot); // update the plot 
    window.location="/createmap";
  
}
    
    
    const paperStyle = { padding: 20,top:10000,height: 650, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (
        <div className="image">
    <img src="plotWorld.png" alt="plotWorld" ></img>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Dialog open >
            <Paper  style={paperStyle}>
                <Grid  align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Edit plot</h2>
                    <br></br>
                    <Typography variant='caption' gutterBottom>Status:{status} </Typography>
              <br></br>
                    <Typography variant='caption' gutterBottom>Description:{plot.description} </Typography>
                                <br></br>

                      <Typography variant='caption' gutterBottom>Owner name:{plot.ownerName} </Typography>

                    <form onSubmit={ handleSubmit }>

                    <Typography variant='caption' gutterBottom>Plot price:{plot.price} </Typography>

                         <TextField  label='editPrice' placeholder="Enter price" 
                    className="form-control"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                         />
                        { <TextField  label='game' placeholder="Enter link to game" 
                    className="form-control"
                    value={linkToGame}
                    onChange={event => setLinkToGame(event.target.value)} 
                    /> }
                         <FormLabel component="legend">STATUS</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype"onChange={onChangeavaibleForSale} style={{ display: 'center' }}>
                            <FormControlLabel value="available for sale" control={<Radio />} label="available for sale" />
                            <FormControlLabel value="not available for sale"  control={<Radio />} label="not available for sale" />
                        </RadioGroup> 
               <input className={inputype} type="submit" value="submit" />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
                <Link to="/createmap" className="btn btn-primary">close</Link>
          <div>
        <br></br>
        </div>
         </form>
             </Grid>

            </Paper>
        </Dialog>
        </div>
    )
}
export default SellerPopUp


