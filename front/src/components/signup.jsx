import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField } from '@material-ui/core'
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
                        
                         <div className="form-group"> 
          <         label>Create Password: </label>
                    <input  type="text"
                     required
                    className="form-control"
                    value={password}
                    onChange={event => setPaswword(event.target.value)}
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

export default FunctionSignUp

