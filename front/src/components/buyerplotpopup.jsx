import React, { useState,useEffect } from 'react'
import { Grid, Paper, Avatar, Typography, Dialog ,TextField} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import axios from 'axios';// axios for send data to the backend.
import '../MetaCentraland/MetaCentraland.css'

import {
    Link
} from 'react-router-dom';


  localStorage.setItem("legened",1);
  const BuyerPopUp = () => {   //define  the attributes 
  const[buyeruser, setBuyerUser] = useState('');      
  const[selleruser, setSellerUser] = useState('');
  const[plot, setPlot] = useState('');
  const[inputtype,setinputtype] = useState('hiddeninput');
  const[gametype,setinputGameType] = useState('hiddeninput');
  const [signature,setSignature] = useState('')
  const [hash,setHash] = useState('');
  const [decrypt,setDecrypt]= useState('');
  const[linkToGame,setLinkToGame] = useState('');


       useEffect(() => {

         const userId = localStorage.getItem("loguserid"); 
        const sellerId = localStorage.getItem("ownerNameId");
              
         axios.get('http://localhost:4000/signupUsers').then((response) => { //get the registerd list from the database
         const data = response.data;
         const length = data.length;

        for(var i=0; i < length; i++)
        {
          if(data[i].ID === userId)
          {
        setBuyerUser(         //set the buyer
           data[i])
        
          }
      if(data[i].ID === sellerId)  //set the seller
          {
        setSellerUser(
           data[i]
        )
        }    
    }
  })
  
         const plot_id = localStorage.getItem("plot");
         axios.get('http://localhost:4000/plots').then((response) => {      //get the plots list from the database
         const data = response.data;
         const length = data.length;
        for(var i=0; i < length; i++)
        {
          if(data[i]._id === plot_id)
          {
            setPlot(      //set the plot
           data[i]
        )
        document.getElementById('hash_plot').value = data[i].hash   //update the hash value in the text field
        setHash(
          data[i].hash
        )
        axios.post('http://localhost:4000/signUpUsers/seller',data[i])    //creating and update the seller signature
        .then((response) => {
                const data = response.data;
                setSignature(data);
        })
        
        if(data[i].linkToGame != "" && data[i].linkToGame != null)  //check if there is a link game and put it in the text field
        {
          
            setLinkToGame(
          data[i].linkToGame
        )

        setinputGameType(
        "validinput"
        )
        }
        else{   //hide the button 'play game'

          setinputGameType(
        "hiddeninput"
        )

        }
            }
      }
      
          })

           setinputtype(
        "hiddeninput"
        )    
      },[]);

        

function handleClick() {    // link to the game
   window.location.href = linkToGame.toString();
  }
function handleVerify()
{
      const information =   
      {
        data:hash,
        publicKey: selleruser.publicKey,
        signature: signature,
      }  
      axios.post('http://localhost:4000/signUpUsers/verify',information)//send the data,public key,signature to the server to check if details are valid
      .then((response) =>{
        const data = response.data
        setDecrypt(data);               //return the result
      })
    

        const userID= localStorage.getItem("loguserid");
        const plotOwnerId= localStorage.getItem("ownerNameId");
        
        if(userID === plotOwnerId)   // if the buyer and the sellers are equal there is no need the button 'buy plot'
        {
           setinputtype(
        "hiddeninput"
        )
        }
        else{
          setinputtype(
        "validinput"
        )
        }

}

 
  const handleSubmit = e => { //when we click on submit button
    let isMinus = 0;
    e.preventDefault();   //do what we wrote down
  
  if(decrypt === true)
  {
  
    const plotId = plot._id
    const updateWallet = Number(buyeruser.wallet)- Number(plot.price)
    if(updateWallet < 0 )
    {
      alert("You dont have enough money!!!");
      isMinus = 1
      window.location="/createmap";

    }
    if(isMinus === 0)
    {

  const updatePlot = {   //update plot details
      ownerName: buyeruser.name,      
       userid: buyeruser.ID
    }

    axios.patch('http://localhost:4000/plots/'+ plotId , updatePlot);

    const userId = buyeruser._id
    const updateBuyerUser = {     //update the buyer wallet after the buying
         wallet: updateWallet
    }
      axios.patch('http://localhost:4000/signupUsers/'+ userId , updateBuyerUser);
 
      const seller_id =selleruser._id
      const sellerWallet =Number(plot.price) + Number(selleruser.wallet);

      const updateSellerUser = {  //update the seller wallet after the selling
         wallet: sellerWallet
    }
        axios.patch('http://localhost:4000/signupUsers/'+ seller_id , updateSellerUser);

    window.location="/createmap";  //return to the map
  }

}
  else {  //decrypt isnt successed
    alert("The details are wrong!");
      }

  }
    const paperStyle = {padding: 20,top:10000,height: 650, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

      return (
        
          <div className="image">
    <img src="plotWorld.png"alt="plotWorld" ></img>
    
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
                    
                    <h2 style={headerStyle}>buy Plot</h2>

                    <Typography variant='caption' gutterBottom>Description:{plot.description} </Typography>
                
                <form onSubmit={handleSubmit}>
                    <Typography variant='caption' gutterBottom>Plot price:{plot.price} </Typography>

                    <br></br>

              <Typography variant='caption' gutterBottom>Owner name:{plot.ownerName} </Typography>
              
             <TextField  id= "hash_plot"label='hash plot' placeholder="E" 
                 required
                    className="form-control"
                    value={""+hash}
                    onChange = {event => setHash(event.target.value)}
                         /> 
                         <br></br>
         <TextField id="digital_signiture"  label='signature' placeholder="E" 
                 required
                    className="form-control"
                    value={signature}
                    onChange ={event => setSignature(event.target.value)}
                         /> 
          <br></br>
        <br></br>
            <button  className="validinput" type="button" onClick={() => handleVerify()} >Verify</button>
                         <br></br>
                         <br></br>
          <TextField id="decrypt_digital_signiture"label='result'  placeholder="result" 
                    className="form-control"
                    value={decrypt}
                         /> 
               <br></br>
        <br></br>                         
              <div>
        <br></br>
        </div>

            <input className={inputtype} type="submit" value="buy plot" />
            <div></div>                  
        <br></br>
      <div></div>

              <button  className={gametype} type="button" onClick={() => handleClick()}>play game</button>
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
export default BuyerPopUp


