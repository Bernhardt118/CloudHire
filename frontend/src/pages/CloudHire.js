import React from 'react';
import Header from '../components/Header'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class CloudHire extends React.Component {

    constructor(props) {
        super(props);
        sessionStorage.setItem("token", "");
        sessionStorage.setItem("user", "");
        sessionStorage.setItem("username", "");
        sessionStorage.setItem("data_is_set", "");
    }

    render() {
        //const register = true;
        //const login = true;
        return (
            <div> 
                <Header option={1}/>
                <div  className="homePageCentre" > {"The developer job platform that has your back - complete with your own dev career coach and upfront salary info."}</div>
                <div  className="homePageCentre" > {"Logo:"}</div>
            
                    <img className='image'
                    src="https://cdn.dribbble.com/users/1769954/screenshots/11832326/media/f2a32c15a31453200d9056881f2dbc0d.png?compress=1&resize=1200x900&vertical=top"
                    alt="new"
                         
                    />
            </div>
        );
    }
};
