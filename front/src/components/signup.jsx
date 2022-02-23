import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField,Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import axios from 'axios';
// axios for send data to the backend.

localStorage.setItem("legened",1);
  const FunctionSignUp = () =>{ 
  // constructor(props) {  
  //   super(props);

  //   this.onChangeUsername = this.onChangeUsername.bind(this);
  //   this.onChangeId = this.onChangeId.bind(this);
  //   this.onChangeUserType = this.onChangeUserType.bind(this);
  //   this.onChangePaswword = this.onChangePaswword.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);

    const[name,setName] = useState('');
    const[ID,setID] = useState('');
    const[password,setPaswword] = useState('');
    const[wallet,setWallet] = useState('1000');
  

  

  const handleSubmit = event => {
    event.preventDefault();


    var isRepeat = 0;
    const newUser = {
      name: name,
      ID: ID,
       password: password,
       wallet:1000

    }
     axios.post('http://localhost:4000/signupUsers/signup', newUser)
     .then((response) => {
         const data = response.data;
         if(data === "You already have account!")  
        {
                alert(data);

        } 
        else{
         
        localStorage.setItem("loguserid",newUser.ID);
        window.location = "/signin";
}
       })


  }
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
        const btnstyle={margin:'8px 0'}

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
                <form onSubmit={handleSubmit}>
             <TextField fullWidth label='Name' id="myName" placeholder="Enter your name" 
                 required
                    className="form-control"
                    value={name}
                    onChange={event => setName(event.target.value)}
                         />
                         <TextField fullWidth label='ID' placeholder="Enter your ID" 
                 required
                    className="form-control"
                    value={ID}
                    onChange={event => setID(event.target.value)}
                         />
                        
                          <TextField fullWidth label="password"placeholder="Enter your ID"
                     required
                    className="form-control"
                    value={password}
                    onChange={event => setPaswword(event.target.value)}
                         />
                        <div>
        <br></br>
        </div>

                <Button type='submit' value="signup" color='primary' variant="contained" style={btnstyle} fullWidth>Create user</Button>               
                </form>
                
            </Paper>
        </Grid>
        </div>
    )
}

export default FunctionSignUp

