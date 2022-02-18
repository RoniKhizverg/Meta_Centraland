import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField,Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import CreateMap from './createmap.component'



//import axios from 'axios';
// axios for send data to the backend.


export default class SellerPopUp extends React.Component {
  constructor(props) {  
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeavaibleForSale = this.onChangeavaibleForSale.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      plot:'',
      description: '',
      price: '',
      avaibleForSale:'',
      addGame:'',
      status:''
    }
  }
       componentDidMount() {

        
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
    this.setState({
      avaibleForSale: e.target.value
    })
  }
   
 

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down


    


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
                    <h2 style={headerStyle}>Edit plot</h2>
                    <br></br>
                    <Typography variant='caption' gutterBottom>Status:{this.state.status} </Typography>
            <br></br>
                    <Typography variant='caption' gutterBottom>Description:{this.state.plot.description} </Typography>
                
                <form onSubmit={this.onSubmit}>
                    <Typography variant='caption' gutterBottom>Plot price:{this.state.plot.price} </Typography>

                         <TextField  label='editPrice' placeholder="Enter price" 
                 required
                    className="form-control"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                         />
                        <TextField  label='game' placeholder="Enter link to game" 
                        required
                    className="form-control"
                    value={this.state.addGame}
                    onChange={this.onChangePrice}
                    />
                         <FormLabel component="legend">STATUS</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype"onChange={this.onChangeavaibleForSale} style={{ display: 'center' }}>
                            <FormControlLabel value="seller" control={<Radio />} label="available for sale" />
                            <FormControlLabel value="buyer"  control={<Radio />} label="not available for sale" />
                        </RadioGroup> 

                         
                        <div>
        <br></br>
        </div>

                    <input type="submit" value="submit" className="btn btn-primary" />
                </form>
                                </Grid>

            </Paper>
        </Dialog>
        </div>
    )
}
}

