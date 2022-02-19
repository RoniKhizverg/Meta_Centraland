import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CreateMap from './createmap.component'
import axios from 'axios';


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
      plot:'',
      description: '',
      price: '',
      privateKey:''
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
   
 onChangePrivateKey(e) {   //when we enters a password its going to call this function
    this.setState({
      privateKey: e.target.value
    })
  }

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down

    const updatePlot = {
      description: this.state.description,
      price: this.state.price,
       userType: this.state.userType,
       password: this.state.password,
       wallet:1000

    }
    


  }
  render() {
    const paperStyle = { padding: 20,top:10000,height: 500, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    console.log(this.state.plot);
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

                         <TextField  label='privateKey' placeholder="Enter seller's private key" 
                 required
                    className="form-control"
                    value={this.state.privateKey}
                    onChange={this.onChangePrivateKey}
                         />
                        
                         
                        <div>
        <br></br>
        </div>

                    <input type="submit" value="buy_plot" className="btn btn-primary" />
                </form>
                                </Grid>

            </Paper>
        </Dialog>
        </div>
    )
}
}

