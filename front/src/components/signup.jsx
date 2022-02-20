import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
// axios for send data to the backend.


export default class Signup extends React.Component {
  constructor(props) {  
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onChangePaswword = this.onChangePaswword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      ID: '',
      userType: '',
      password:'',
      wallet: 1000,
      users:[]
    }
  }

  onChangeUsername(e) {   //when we enters a user name its going to call this function
    this.setState({
      name: e.target.value
    })
  }
  onChangeId(e) {   //when we enters id its going to call this function
    this.setState({
      ID: e.target.value
    })
  }
   onChangeUserType(e) {   //when we enters a user type its going to call this function
    this.setState({
      userType: e.target.value
    })
  }
 onChangePaswword(e) {   //when we enters a password its going to call this function
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down


    var isRepeat = 0;
    const newUser = {
      name: this.state.name,
      ID: this.state.ID,
       userType: this.state.userType,
       password: this.state.password,
       wallet:1000

    }
     axios.get('http://localhost:4000/signupUsers')
     .then((response) => {
         const data = response.data;
         const length = data.length;
         for(var i=0; i < length; i++)
         {
            if(data[i].ID === newUser.ID )
            {
                isRepeat = 1;
                alert("You already have account!!!");
                break;
            }    
            }
        if(isRepeat === 0)
        {
        localStorage.setItem("loguserid",newUser.ID);
        axios.post('http://localhost:4000/signupUsers/signup',newUser)
        .then(res => console.log(res.data));

        window.location = "/signin";
}
       })


  }
  render() {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
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
             <TextField fullWidth label='Name' id="myName" placeholder="Enter your name" 
                 required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeUsername}
                         />
                         <TextField fullWidth label='ID' placeholder="Enter your ID" 
                 required
                    className="form-control"
                    value={this.state.ID}
                    onChange={this.onChangeId}
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
                        <div>
        <br></br>
        </div>

                    <input type="submit" value="Create_User" className="btn btn-primary" />
                </form>
                
            </Paper>
        </Grid>
        </div>
    )
}
}

