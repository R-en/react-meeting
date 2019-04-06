import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
import firebase from './Firebase';


import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Meetings from './Meetings';
import Register from './Register';
import CheckIn from './CheckIn';

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

      const meetingsRef = firebase.database().ref('meetings/' + FBuser.uid);
      meetingsRef.on('value' , snapshot =>{
        let meetings = snapshot.val();

        let meetingsList = [];

        for(let item in meetings){
          meetingsList.push({
            meetingID : item,
            meetingName: meetings[item].meetingName
          });
        }

        this.setState({
          meetings: meetingsList,
          howManyMeetings: meetingsList.length
        });

      });

    }else {
        this.setState({
          user: null
        })
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

  addMeeting = meetingName => {
    const ref = firebase
               .database()
               .ref(`meetings/${this.state.user.uid}`);
    ref.push({meetingName: meetingName});
  }

  render() {
    return (
      <div>
       <Navigation user={this.state.user} logoutUser = {this.logoutUser}/>

        {this.state.user && <Welcome userName={this.state.displayName} logoutUser = {this.logoutUser}/>}

        <Router>
          
          <Home path ="/" user={this.state.user} />
          <Login path = "/login"/>
          <Meetings path = '/meetings' meetings={this.state.meetings}  addMeeting = {this.addMeeting}
                    userID = {this.state.userID}
          />

          <CheckIn path="/checkin/:userID/:meetingID"></CheckIn>
          <Register path ='register' registerUser = {this.registerUser}/>

        </Router>

      </div>
    );
  }
}

export default App;
