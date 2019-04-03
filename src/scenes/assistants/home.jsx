import React, { Component } from 'react';
import Auth from '../../Auth/Auth';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class AssistantSide extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInclude: null
        }
        
        this.gettingRideData();

    }

  enterForm = () => {
      return (
      <form>
          <label><input type="number"></input> מספר פלאפון</label>
          <select>
              <option value="forward">הלוך</option>
              <option value="back">חזור</option>
          </select>
          <Link to="/assistant/ride-details"><button>כניסה למערכת</button></Link>
      </form>)
  }

  gettingRideData = () => {
   Auth.authFetch('/api/rides?filter={ 	"where": {"activities": {"isLive": true}     } , 	"include": ["assistants", "activities"] }').then(response => { return response.json() }).then(res => {
        console.log("answer of",'/api/rides?filter={{"where": {"activities": {"isLive": true}     }}{ "include": ["assistants", "activities"]}}');
        console.log("res",res);
        this.setState({ isInclude: res })
    })    
}
  
  
  
  
    render() {
<<<<<<< HEAD
        console.log("rides" , this.state.isInclude)
        return(this.enterForm())
=======
        
        return(
            this.enterForm()
            )
>>>>>>> 7f8cfb0ed6c90a0590f112e560a1a37a7e68718c
    }
}


export default AssistantSide;