import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
// axios for send data to the backend.


export default class Signup extends React.Component {
  constructor(props) {  
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onChangePaswword = this.onChangePaswword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      userType: '',
      password:'',
      wallet: 1000,
      users:[]
    }
  }
//   componentDidMount(){  //will automatically be called right before anything displays on the page 
//     axios.get('http://localhost:4000/signupUsers/')
//     .then(response => {
//         if(response.data.length > 0) {
//             Touch.setState({
//                 users: response.data.map(user => user.name),
//                 name:  response.data[0].name
//             })

//         }
//     })
//   }

  onChangeUsername(e) {   //when we enters a user name its going to call this function
    this.setState({
      name: e.target.value
    })
  }
   onChangeUserType(e) {   //when we enters a user name its going to call this function
    this.setState({
      userType: e.target.value
    })
  }
 onChangePaswword(e) {   //when we enters a user name its going to call this function
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down

    const newUser = {
      name: this.state.name,
       userType: this.state.userType,
       password: this.state.password,
       wallet:1000

    }

    console.log(newUser);

    //send the user data to the backend

    axios.post('http://localhost:4000/signupUsers/signup',newUser)
    .then(res => console.log(res.data));
    

    window.location = "/";
}
  render() {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>

                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={this.onSubmit}>
             <TextField fullWidth label='Name' placeholder="Enter your name" 
                 required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeUsername}
                         />
                        <FormLabel component="legend">User Type</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype"onChange={this.onChangeUserType} style={{ display: 'initial' }}>
                            <FormControlLabel value="seller" control={<Radio />} label="Seller" />
                            <FormControlLabel value="buyer"  control={<Radio />} label="Buyer" />
                        </RadioGroup> 
                         <div className="form-group"> 
          <         label>Create Password: </label>
                    <input  type="text"
                     required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePaswword}
                         />
                         </div>
                        

                    <input type="submit" value="Create User" className="btn btn-primary" />
                </form>
                
            </Paper>
        </Grid>
        </div>
    )
}
}

