import React, { useState,useEffect } from 'react'
import { Grid, Paper, Avatar, Typography, Dialog ,TextField} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import axios from 'axios';
import '../MetaCentraland/MetaCentraland.css'

import {
    Link
} from 'react-router-dom';
//import axios from 'axios';
// axios for send data to the backend.

localStorage.setItem("legened",1);
const BuyerPopUp = () => {
  

  const[buyeruser, setBuyerUser] = useState('');
  const[selleruser, setSellerUser] = useState('');
  const[plot, setPlot] = useState('');
  // const[price], [SetPrice] = useState('');
 // const[privateKey], [setprivateKey] = useState('');
 const[inputtype,setinputtype] = useState('hiddeninput');
  const[gametype,setinputGameType] = useState('hiddeninput');
  const [signature,setSignature] = useState('')

   const[linkToGame,setLinkToGame] = useState('');

       useEffect(() => {

       


         const userId = localStorage.getItem("loguserid");
        axios.get('http://localhost:4000/signupUsers').then((response) => {
         const data = response.data;
         const length = data.length;

        for(var i=0; i < length; i++)
        {
          if(data[i].ID === userId)
          {
        setBuyerUser(
           data[i])
        
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
axios.post('http://localhost:4000/signUpUsers/seller',data[i])
        .then((response) => {
                const data = response.data;
                setSignature(data);
                console.log(data)
        })
        
        console.log(data[i].linkToGame)
        if(data[i].linkToGame != "" && data[i].linkToGame != null)
        {
          
            setLinkToGame(
          data[i].linkToGame
        )

        setinputGameType(
        "validinput"
        )
        }
        else{

          setinputGameType(
        "hiddeninput"
        )

        }
            }
      }
      
          })


         axios.get('http://localhost:4000/signupUsers').then((response) => {
         const data = response.data;
         const length = data.length;
           const sellerId = localStorage.getItem("ownerNameId");
        console.log(sellerId)

        for(var i=0; i < length; i++)
        {
          if(data[i].ID === sellerId)
          {
        setSellerUser(
           data[i]
        )
      }
    }
  })
        // const userID= localStorage.getItem("loguserid");
        // const plotOwnerId= localStorage.getItem("ownerNameId");
        
        // if(userID === plotOwnerId)
        // {
           setinputtype(
        "hiddeninput"
        )
        // }
        // else{
        //   setinputtype(
        // "validinput"
        // )
        // }
// 
        
      },[]);

        

function handleClick() {
   window.location.href = plot.linkToGame.toString();
   console.log("hi")
  }
function handleVerify()
{

   
        console.log(signature)
      const information =
      {
        data: plot.hash,
        publicKey: selleruser.publicKey,
        signature: signature
      }  
      console.log(information)
      axios.post('http://localhost:4000/signUpUsers/verify',information)
      .then((response) =>{
        const data = response.data
        console.log(data)
        document.getElementById('digital_signiture').value = data;
        console.log("hi")
      })
    

        const userID= localStorage.getItem("loguserid");
        const plotOwnerId= localStorage.getItem("ownerNameId");
        
        if(userID === plotOwnerId)
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
    let inGame = 0;
  //   if(plot.linkToGame !=null)
  //  {
  //      inGame = 1;
  //     window.location.href = plot.linkToGame.toString()
  //  }
   if(inGame !== 1)
   {
    const plotId = plot._id
        console.log(plotId);

        console.log(buyeruser)
    
    const updateWallet = Number(buyeruser.wallet)- Number(plot.price)
    if(updateWallet < 0 )
    {
      alert("You dont have enough money!!!");
      isMinus = 1
          window.location="/createmap";

    }
    if(isMinus === 0)
    {

const updatePlot = {
      ownerName: buyeruser.name,
      
      //  userType: userType,
      //  password: password,
       userid: buyeruser.ID
    }
        console.log(updatePlot);

    axios.patch('http://localhost:4000/plots/'+ plotId , updatePlot);


    const userId = buyeruser._id
    const updateBuyerUser = {
         wallet: updateWallet
         //privatekey:
    }
      axios.patch('http://localhost:4000/signupUsers/'+ userId , updateBuyerUser);
 
      const seller_id =selleruser._id
      console.log(seller_id);
      const sellerWallet =Number(plot.price) + Number(selleruser.wallet);
            console.log(sellerWallet);

      const updateSellerUser = {
         wallet: sellerWallet
         //privatekey:
    }
        axios.patch('http://localhost:4000/signupUsers/'+ seller_id , updateSellerUser);


    window.location="/createmap";
  }

}


  }
    const paperStyle = { padding: 20,top:10000,height: 500, width: 300, margin: "0 auto" }
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


             <TextField  label='hash plot' placeholder="E" 
                 required
                    className="form-control"
                    value={" "+plot.hash}
                         /> 
                         <br></br>

         <TextField id="digital_signiture"  label='signature' placeholder="E" 
                 required
                    className="form-control"
                    value={localStorage.getItem('signature')}
                         /> 

                      <br></br>
        <br></br>

              <button  className="validinput" type="button" onClick={() => handleVerify()} >Verify</button>

                         <br></br>
                         <br></br>
          <TextField id="digital_signiture"  placeholder="signiture after dycript" 
                 required
                    className="form-control"
                    value={""}
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


