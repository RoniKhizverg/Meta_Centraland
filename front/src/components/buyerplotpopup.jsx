import React from 'react'
import { Grid, Paper, Avatar, Typography, Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CreateMap from './createmap.component'
import axios from 'axios';
import '../MetaCentraland/MetaCentraland.css'


//import axios from 'axios';
// axios for send data to the backend.


export default class BuyerPopUp extends React.Component {
  constructor(props) {  
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangePrivateKey = this.onChangePrivateKey.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      buyeruser:'',
      selleruser:'',
      plot:'',
      description: '',
      price: '',
      privateKey:'',
      inputtype:'hiddeninput'

    }
  }
       componentDidMount() {

       


         const userId = localStorage.getItem("userid");
        axios.get('http://localhost:4000/signupUsers').then((response) => {
         const data = response.data;
         const length = data.length;

        for(var i=0; i < length; i++)
        {
          if(data[i].ID === userId)
          {
        this.setState({
          buyeruser: data[i]
        })
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
            this.setState({
          plot: data[i]
        })
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
        this.setState({
          selleruser: data[i]
        })
      }
    }
  })
        const selleruserid= localStorage.getItem("userid");
        const plotOwnerName= localStorage.getItem("ownerNameId");
        console.log(selleruserid)
                console.log(plotOwnerName)

        if(selleruserid === plotOwnerName)
        {
           this.setState({
        inputtype:"hiddeninput"
        })
        }
        else{
          this.setState({
        inputtype:"validinput"
        })
        }
   

        

       
      }

        


  onChangeDescription(e) {   //when we enters a user name its going to call this function
    this.setState({
      description: e.target.value
    })
  }
  onChangePrice(e) {   //when we enters id its going to call this function
    this.setState({
      price: e.target.value
    })
  }
   
 onChangePrivateKey(e) {   //when we enters a password its going to call this function
    this.setState({
      privateKey: e.target.value
    })
  }

  onSubmit(e) { //when we click on submit button
    let isMinus = 0;
    e.preventDefault();   //do what we wrote down

    const plotId = this.state.plot._id
    const updatePlot = {
      ownerName: this.state.buyeruser.name,
      
       userType: this.state.userType,
       password: this.state.password,
       userid: this.state.buyeruser.ID
    }
    axios.patch('http://localhost:4000/plots/'+ plotId , updatePlot);

    const updateWallet = Number(this.state.buyeruser.wallet)- Number(this.state.plot.price)
    if(updateWallet < 0 )
    {
      alert("You dont have enough money!!!");
      isMinus = 1
          window.location="/createmap";

    }
    if(isMinus === 0)
    {
    const userId = this.state.buyeruser._id
    console.log(userId)
    const updateBuyerUser = {
         wallet: updateWallet
         //privatekey:
    }
      axios.patch('http://localhost:4000/signupUsers/'+ userId , updateBuyerUser);
 
      const seller_id = this.state.selleruser._id
      console.log(seller_id);
      const sellerWallet =Number(this.state.plot.price) + Number(this.state.selleruser.wallet);
            console.log(sellerWallet);

      const updateSellerUser = {
         wallet: sellerWallet
         //privatekey:
    }
        axios.patch('http://localhost:4000/signupUsers/'+ seller_id , updateSellerUser);


    window.location="/createmap";
  }

    


  }
  render() {
    const paperStyle = { padding: 20,top:10000,height: 500, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
       
      return (
        <div>
          <CreateMap></CreateMap>

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

                    <Typography variant='caption' gutterBottom>Description:{this.state.plot.description} </Typography>
                
                <form onSubmit={this.onSubmit}>
                    <Typography variant='caption' gutterBottom>Plot price:{this.state.plot.price} </Typography>

                    <br></br>

                      <Typography variant='caption' gutterBottom>Owner name:{this.state.plot.ownerName} </Typography>

                         {/* <TextField  label='privateKey' placeholder="Enter seller's private key" 
                 required
                    className="form-control"
                    value={this.state.privateKey}
                    onChange={this.onChangePrivateKey}
                         /> */}
                        
                         
                        <div>
        <br></br>
        </div>


                    <input className={this.state.inputtype} type="submit" value="buy_plot" />
                </form>
                                </Grid>

            </Paper>
        </Dialog>
        </div>
    )
}
}

