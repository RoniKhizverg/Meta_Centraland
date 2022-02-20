import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField,Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import CreateMap from './createmap.component'
import '../MetaCentraland/MetaCentraland.css'



//import axios from 'axios';
// axios for send data to the backend.


export default class SellerPopUp extends React.Component {
  constructor(props) {  
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeavaibleForSale = this.onChangeavaibleForSale.bind(this);
    this.onChangeLinkGame = this.onChangeLinkGame.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      plot:'',
      user:'',
      selleruser: '',
      description: '',
      price: '',
      avaibleForSale:'',
      linkToGame:'',
      status:'',
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
          user: data[i]
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
            console.log(this.state.plot.avaibleForSale)
        if(this.state.plot.avaibleForSale === true)
    {
        this.setState({
      status: "For sale"
        })
    }
     else
    {
        this.setState({
      status: "No for sale"
        })
    }
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
        inputtype:"validinput"
        })
        }
        else{
          this.setState({
        inputtype:"hiddeninput"
        })
        }
   

      }

        
onChangeLinkGame(e) {   //when we enters a user name its going to call this function
    this.setState({
      linkToGame: e.target.value
    })
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
   onChangeavaibleForSale(e) {   //when we enters id its going to call this function
    if(e.target.value === "available for sale" )
        {
    this.setState({       
      avaibleForSale: true
      
    })
  }
  else{
       this.setState({       
      avaibleForSale: false
          })

  }
}
   
 

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down
   
   const plotId = this.state.plot._id
   console.log(plotId)
const updatePlot = {
      price: this.state.price,
      avaibleForSale: this.state.avaibleForSale,
      linkToGame: this.state.linkToGame
    }
    axios.patch('http://localhost:4000/plots/'+ plotId , updatePlot);
    window.location="/createmap";


  
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
            <Paper  style={paperStyle}>
                <Grid  align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Edit plot</h2>
                    <br></br>
                    <Typography variant='caption' gutterBottom>Status:{this.state.status} </Typography>
            <br></br>
                    <Typography variant='caption' gutterBottom>Description:{this.state.plot.description} </Typography>
                                <br></br>

                      <Typography variant='caption' gutterBottom>Owner name:{this.state.plot.ownerName} </Typography>

                <form onSubmit={this.onSubmit}>
                    <Typography variant='caption' gutterBottom>Plot price:{this.state.plot.price} </Typography>

                         <TextField  label='editPrice' placeholder="Enter price" 
                 required
                    className="form-control"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                         />
                        { <TextField  label='game' placeholder="Enter link to game" 
                    className="form-control"
                    value={this.state.linkToGame}
                    onChange={this.onChangeLinkGame} 
                    /> }
                         <FormLabel component="legend">STATUS</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype"onChange={this.onChangeavaibleForSale} style={{ display: 'center' }}>
                            <FormControlLabel value="seller" control={<Radio />} label="available for sale" />
                            <FormControlLabel value="buyer"  control={<Radio />} label="not available for sale" />
                        </RadioGroup> 

                              <input className={this.state.inputtype} type="submit" value="submit" />

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
}

