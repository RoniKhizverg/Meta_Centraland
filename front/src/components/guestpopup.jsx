import React from 'react'
import { Grid, Paper, Avatar, Typography,Dialog } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import axios from 'axios';
import CreateMap from './createmap.component'
import '../MetaCentraland/MetaCentraland.css'




//import axios from 'axios';
// axios for send data to the backend.

export default class GuestPopUp extends React.Component {
  constructor(props) {  
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      plot:'',
      linkToGame:'',
      status:'',
      inputtype:'hiddeninput'

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
        if(data[i].linkToGame != null)
        {
            this.setState({
      linkToGame: data[i].linkToGame
        })
        this.setState({
        inputtype:"validinput"
        })
        }
        else{
            this.setState({
        inputtype:"hiddeninput"
        })
        }
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

        

   
 

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down

   if(this.state.plot.linkToGame !=null)
   {
       console.log(this.state.plot.linkToGame.toString())
      window.location.href = this.state.plot.linkToGame.toString()
   }
   
   

  }
  render() {
    
    const paperStyle = { padding: 20,top:10000,height: 500, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
            
    return (
        <div>
          <CreateMap></CreateMap>
                   <input className={this.state.inputtype} type="submit" value="play game" />

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
                    <Typography variant='caption' gutterBottom>Status:{this.state.status} </Typography>
            <br></br>
                    <Typography variant='caption' gutterBottom>Description:{this.state.plot.description} </Typography>
                
                <form onSubmit={this.onSubmit}>
                    <Typography variant='caption' gutterBottom>Plot price:{this.state.plot.price} </Typography>

                    <br></br>

                      <Typography variant='caption' gutterBottom>Owner name:{this.state.plot.ownerName} </Typography>
                                             
                        <div>
        <br></br>
        </div>
        
                   <input className={this.state.inputtype} type="submit" value="play game" />
         
                </form>
                                </Grid>

            </Paper>
        </Dialog>
        </div>
    )
}
}

