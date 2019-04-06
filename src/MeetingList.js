import React, {Component} from 'react';
import firebase from './Firebase';
import {GoTrashcan} from 'react-icons/go';
import { navigate } from '@reach/router';
import {FaLink} from 'react-icons/fa';

class Welcome extends Component{
    constructor(props){
        super(props);

        this.deleteMeeting = this.deleteMeeting.bind(this);
    }

    deleteMeeting =(e, whichMeeting) =>{
        e.preventDefault();
        const ref = firebase.database()
                            .ref(`meetings/${this.props.userID}/${whichMeeting}`);
        ref.remove();
    }

    render(){
        const {meetings} = this.props;

        const myMeetings = meetings.map((item)=>{
            return (
                <div>
                    <div className="list-group-item d-flex" key={item.meetingID}>

                        <section  className="btn-group align-self-center" role="group" aria-label="Meeting options">
                            <button className="btn btn-sm btn-outline-secondary"
                            title="Delete Merting"
                            onClick={e => this.deleteMeeting(e, item.meetingID)}
                            >
                            <GoTrashcan />
                            </button>

                            <button className="btn btn-sm btn-outline-secondary"
                            title="Check in"
                            onClick={
                                () => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)
                            }
                            >
                            <FaLink />
                            </button>
                        </section>

                        <section className="pl-3 aligh-self-center text-left">
                            {item.meetingName}
                        </section>
                    </div>
                </div>
            )    
        })
        return(
            <div>
               {myMeetings}
            </div>
            
        );
    }
}

export default Welcome;