import React, { useState,useEffect } from 'react';
import { Grid, Paper, Avatar, Typography, TextField,Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import CreateMap from './createmap.component'
import '../MetaCentraland/MetaCentraland.css'
import {
    Link
} from 'react-router-dom';


//import axios from 'axios';
// axios for send data to the backend.

localStorage.setItem("legened",1);
const SellerPopUp =() => {

    const[plot,setPlot] = useState('');
    const[user,setUser] = useState('');
    const[selleruser,setSellerUser] = useState('');
    const[description,setDescription] = useState('');
    const[price,setPrice] = useState('');
    const[avaibleForSale,setAvaibleForSale] = useState('');
    const[linkToGame,setLinkToGame] = useState('');
    const[status,setStatus] = useState('');
    const[inputype,setInputype] = useState('hiddeninput');
  // constructor(props) {  
  //   super(props);

  //   this.onChangeDescription = this.onChangeDescription.bind(this);
  //   this.onChangePrice = this.onChangePrice.bind(this);
  //   this.onChangeavaibleForSale = this.onChangeavaibleForSale.bind(this);
  //   this.onChangeLinkGame = this.onChangeLinkGame.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);

  //   this.state = {
  //     plot:'',
  //     user:'',
  //     selleruser: '',
  //     description: '',
  //     price: '',
  //     avaibleForSale:'',
  //     linkToGame:'',
  //     status:'',
  //     inputtype:'hiddeninput'

  //   }
  // }
       useEffect(() => {
        
const userId = localStorage.getItem("userid");
        axios.get('http://localhost:4000/signupUsers').then((response) => {
         const data = response.data;
         const length = data.length;

        for(var i=0; i < length; i++)
        {
          if(data[i].ID === userId)
          {
        setUser(
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
            setPlot(
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
        const plotOwnerName= localStorage.getItem("ownerNameId");
        console.log(selleruserid)
                console.log(plotOwnerName)

        if(selleruserid === plotOwnerName)
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
         console.log(linkToGame)

    let plotPrice='';
    if(!price)
    {
      plotPrice = plot.price;
    }
    else{
      plotPrice =price;
    }

   let availablePlot='';
   console.log(avaibleForSale)
    if(avaibleForSale === "")
    {
      availablePlot = plot.avaibleForSale;
    }
    else{
      availablePlot =avaibleForSale
    }
   const plotId = plot._id
   console.log(availablePlot)
const updatePlot = {
      price: plotPrice,
      avaibleForSale: availablePlot,
      linkToGame: linkToGame
    }
    console.log(updatePlot)
    axios.patch('http://localhost:4000/plots/'+ plotId , updatePlot);
    window.location="/createmap";


  
}
    
    
    const paperStyle = { padding: 20,top:10000,height: 650, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (
        <div className="image">
    <img src="plotWorld.png" ></img>

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


