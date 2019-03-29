import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
import firebase from './Firebase';


import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Meetings from './Meetings';
import Register from './Register';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(){
    super();

    this.state ={
      user : null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(FBuser => {
      if(FBuser){
        this.setState({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.uid
        });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBuser => {
      FBuser.updateProfile({
        displayName: userName
      }).then(()=>{
        this.setState({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.uid
        });
        navigate('./meetings');
      })
    })
  }

  logoutUser = e =>{
    e.preventDefault();
    this.setState({
      user:null,
      displayName: null,
      userID: null
    });

    firebase.auth().signOut().then(()=>{
      navigate('./login');
    });
  }

  render() {
    return (
      <div>
       <Navigation user={this.state.user} logoutUser = {this.logoutUser}/>

        {this.state.user && <Welcome userName={this.state.displayName} logoutUser = {this.logoutUser}/>}

        <Router>
          
          <Home path ="/" user={this.state.user} />
          <Login path = "/login"/>
          <Meetings path = '/meetings' />
          <Register path ='register' registerUser = {this.registerUser}/>

        </Router>

      </div>
    );
  }
}

export default App;
