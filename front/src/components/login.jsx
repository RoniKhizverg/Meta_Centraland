import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';


const Login = () => {


    // this.onChangeID = this.onChangeID.bind(this);
    // this.onChangePaswword = this.onChangePaswword.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    const[ID,setID] = useState('');
    const[password,setPassword] = useState('');
  

  const handleSubmit = event => {
    event.preventDefault();
    var notRegistered = 0;
    var isPasswordValid =1;

    const user = {
       ID: ID,
       password: password

    }
axios.get('http://localhost:4000/signupUsers')
     .then((response) => {
         
         const data = response.data;
         const length = data.length;
         for(var i=0; i < length; i++)
         {
            if(data[i].ID === user.ID )
            {
                if(data[i].password === user.password)
                {
                localStorage.clear();
                localStorage.setItem("loguserid",data[i].ID);
                axios.post('http://localhost:4000/logsIn/login',user)
                .then(res => console.log(res.data));
                window.location = "/createmap";
                notRegistered = 1;
                break;
                }
                else{
                    isPasswordValid=0;
                    alert("Password incorrect!!!");
                    break;
                }
            }    
            }
        if(notRegistered === 0 && isPasswordValid === 1)
        {
            alert("Your details are wrong!!!");

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