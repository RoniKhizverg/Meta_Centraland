import React from 'react'
import { Grid,FormLabel,Radio,RadioGroup,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


export default class Login extends React.Component {

constructor(props) {  
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePaswword = this.onChangePaswword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password:'',
      
    }
  }
   onChangeUsername(e) {   //when we enters a user name its going to call this function
    this.setState({
      username: e.target.value
    })
  }
onChangePaswword(e) {   //when we enters a user name its going to call this function
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) { //when we click on submit button
    e.preventDefault();   //do what we wrote down

    const user = {
      username: this.state.username,
       password: this.state.password,

    }

    console.log(user);

    

    

    window.location = "/";
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
                <TextField label='Username' placeholder='Enter username' fullWidth required
                     required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                         />
                        
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
                className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePaswword}
                         />

                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>               
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
