import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';


export default class Login extends React.Component {

constructor(props) {  
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePaswword = this.onChangePaswword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ID: '',
      password:'',
      
    }
  }
   onChangeID(e) {   //when we enters a user name its going to call this function
    this.setState({
      ID: e.target.value
    })
  }
onChangePaswword(e) {   //when we enters a user name its going to call this function
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down
    var notRegistered = 0;
    var isPasswordValid =1;

    const user = {
       ID: this.state.ID,
       password: this.state.password,

    }
axios.get('http://localhost:4000/signupUsers')
     .then((response) => {
         const data = response.data;
         const length = data.length;
         for(var i=0; i < length; i++)
         {
            if(data[i].ID === user.ID )
            {
                if(data[i].password == user.password)
                {
                window.location = "/";
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
        if(notRegistered == 0 && isPasswordValid == 1)
        {
            alert("Your details are wrong!!!");

        }

       })
  }



render() {

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
                <form onSubmit={this.onSubmit}>
                <TextField label='ID' placeholder='Enter ID' fullWidth 
                     required
                    className="form-control"
                    value={this.state.ID}
                    onChange={this.onChangeID}
                         />
                        
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
                className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePaswword}
                         />

                <Button type='submit' value="Create_User" color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>               
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
}
