import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
localStorage.setItem("legened",1);
const Login = () => {  //define variables
     const[ID,setID] = useState('');
    const[password,setPassword] = useState('');
    const[userType,setUserType] = useState('');


  const handleSubmit = event => {
    event.preventDefault();
    const user = {
       ID: ID,
       password: password,
       userType:userType
    }

 axios.post('http://localhost:4000/logsIn/login',user).then((response) => { //check if the user log'in is valid
         const data = response.data;
        if(data === "Cannot find User")  
        {
            alert("Your details are wrong!!!");

        } 
        else if(data === "wrong password!")  
        {
            alert(data);

        }    
        else{  //the validation successed
             localStorage.clear();
            localStorage.setItem("loguserid",user.ID);
            window.location="/createmap";
        }          
    
       })
               
    }

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                <TextField label='ID'id="userid" placeholder='Enter ID' fullWidth 
                     required
                    className="form-control"
                    value={ID}
                    onChange={event => setID(event.target.value)}
                         />
                        
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth 
                required
                className="form-control"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                         />
            <FormLabel component="legend">User Type</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype"onChange={event => setUserType(event.target.value)} style={{ display: 'initial' }}>
                            <FormControlLabel value="seller" control={<Radio />} label="Seller" />
                            <FormControlLabel value="buyer"  control={<Radio />} label="Buyer" />
                        </RadioGroup> 
                <Button type='submit' value="Login" color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>               
                <Typography align="center">Do you not have an account ? <br></br>
                     <Link href="/signup" onClick={()=>window.location="/"} >
                        Sign Up 
                </Link>
                </Typography>
                    </form>

            </Paper>
        </Grid>
        
        </div>
    )
}

export default Login