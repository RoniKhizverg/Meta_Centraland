import React, { useState,useEffect } from 'react'
import { Grid, Paper, Avatar, Typography, Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CreateMap from './createmap.component'
import axios from 'axios';
import '../MetaCentraland/MetaCentraland.css'


//import axios from 'axios';
// axios for send data to the backend.


const BuyerPopUp = () => {
  // constructor(props) {  
  //   super(props);

  //   this.onChangeDescription = this.onChangeDescription.bind(this);
  //   this.onChangePrice = this.onChangePrice.bind(this);
  //   this.onChangePrivateKey = this.onChangePrivateKey.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);

  const[buyeruser, setBuyerUser] = useState('');
  const[selleruser, setSellerUser] = useState('');
  const[plot, setPlot] = useState('');
  // const[price], [SetPrice] = useState('');
 // const[privateKey], [setprivateKey] = useState('');
 const[inputtype,setinputtype] = useState('hiddeniput');
  const[gametype,setinputGameType] = useState('hiddeniput');

   const[linkToGame,setLinkToGame] = useState('');



  //   this.state = {
  //     buyeruser:'',
  //     selleruser:'',
  //     plot:'',
  //     description: '',
  //     price: '',
  //     privateKey:'',
  //     inputtype:'hiddeninput'

  //   }
  // }
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
        if(data[i].linkToGame != null)
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
       
      },[]);

        


  

  const handleSubmit = e => { //when we click on submit button
    let isMinus = 0;
    e.preventDefault();   //do what we wrote down
    let inGame = 0;
    if(plot.linkToGame !=null)
   {
       inGame = 1;
      window.location.href = plot.linkToGame.toString()
   }
   if(inGame !== 1)
   {
    const plotId = plot._id
        console.log(plotId);

        console.log(buyeruser)
    const updatePlot = {
      ownerName: buyeruser.name,
      
      //  userType: userType,
      //  password: password,
       userid: buyeruser.ID
    }
    axios.patch('http://localhost:4000/plots/'+ plotId , updatePlot);

    const updateWallet = Number(buyeruser.wallet)- Number(plot.price)
    console.log(updatePlot);
    if(updateWallet < 0 )
    {
      alert("You dont have enough money!!!");
      isMinus = 1
          window.location="/createmap";

    }
    if(isMinus === 0)
    {
    const userId = buyeruser._id
    console.log(userId)
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
          <div class="image">
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

                         {/* <TextField  label='privateKey' placeholder="Enter seller's private key" 
                 required
                    className="form-control"
                    value={this.state.privateKey}
                    onChange={this.onChangePrivateKey}
                         /> */}
                        
                         
                        <div>
        <br></br>
        </div>


                    <input className={inputtype} type="submit" value="buy_plot" />
                            <div></div>

                      <input className={gametype} type="submit" value="play game" />

                </form>
                                </Grid>

            </Paper>
        </Dialog>
        </div>
    )
}
export default BuyerPopUp


