import React from 'react'
import axios from 'axios';

export default class LogOut extends React.Component {

constructor(props) {

        super(props);
      
        this.state = {
           user:this.logout()
        
        }

    }


logout()
    {
       let userId = localStorage.getItem('user_id');
      localStorage.clear();
      axios.delete('http://localhost:4000/logsIn/'+ userId)
        .then(res => console.log(res.data));
    }
    render() {
return(
   <div>{window.location="/createmap"}</div>
)
    }
}
      
  

