import React, {Component} from 'react';

class Welcome extends Component{
    render(){
        const {user} = this.props;

        return(
            <div className="text-center mt-4">
                <span className="text-secondary font-weight-bold pl-1">
                    Welcome {user}
                </span>,

                <a className="text-primary font-weight-bold pl-1" href='/'>
                    Log Out
                </a>
            </div>
            
        );
    }
}

export default Welcome;