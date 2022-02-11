import React from 'react'
import { Grid,FormLabel,Radio,RadioGroup,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Login=({handleChange})=>{

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormLabel component="legend">User Type</FormLabel>
                        <RadioGroup aria-label="usertype" name="usertype" style={{ display: 'initial' }}>
                            <FormControlLabel value="seller" control={<Radio />} label="Seller" />
                            <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
                        </RadioGroup>

                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>               
                <Typography > Do you have an account ?
                     <Link href="/signup" onClick={()=>handleChange("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login