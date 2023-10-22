import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
//import Select from 'react-select';

//import Button from 'react-bootstrap/Button'
//import $ from 'jquery';  
//import Popper from 'popper.js';  
//import 'bootstrap/dist/js/bootstrap.bundle.min';  
//import React, { useState } from 'react';
//import { Text, TextInput, View } from 'react';
//import {ReactComponent as Logo} from '../../../frontend/Pictures/SignIn.png'  <Logo/>

//import Button from 'react-bootstrap/Button'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import image from './../../Pictures/sign-in-icon-9.jpg';

//<img src={image} height={100} width={100} />

const optionsUser = [
    { label: "Client", value: "Client" },
    { label: "Company", value: "Company" }
  ];

class SignIn extends React.Component {

   constructor(props) {
       super(props);
       this.handleSignIn= this.handleSignIn.bind(this);
       //this.props.setToken = this.props.setToken.bind(this);
       //sessionStorage.setItem("token", "");
    //    this.state = {
    //        token: ""
    //     };
       
   };

   handleSignIn(e) {
        e.preventDefault();
        //const {store, actions} = useContext(Context);
        const email = e.target.elements.username.value.trim();
        const password = e.target.elements.password.value;
        const user = e.target.elements.user.value;

        //console.log(this.props);

        if (email !== "" && password != ""){
            //console.log(email);
            //console.log(password);
            if (user != "") {
                //console.log(user);
                if (user == 'Client') {
                    //console.log("Client");
                    // do a post to client
                    const signin = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email:email,
                            password:password
                        })
                    }
            
                    fetch('http://127.0.0.1:5000/loginCl', signin)
                    .then(resp => {
                        if(resp.status === 200) {
                            //alert(resp.json());
                            this.props.setHasFilter(false);
                            this.props.history.push('/homepage');
                            //console.log('You are signed in');
                            return resp.json();
                        } else {
                            return alert("Put in correct information");
                        } 
                    })
                    .then(data => {
                        if (data != undefined && data != "") {
                            sessionStorage.setItem("token", data.access_token); 
                            sessionStorage.setItem("user", '');
                            sessionStorage.setItem("username", email);
                            this.props.setData(
                                sessionStorage.getItem("token"), 
                                sessionStorage.getItem("user"), 
                                sessionStorage.getItem("username")
                            );
                            
                            //this.props.setData(data.access_token, false);
                        }
                        
                        //history.push('/homepage');
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })

                    /////



                } else if (user == 'Company') {
                    // post to compony
                    const signin = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            companyName:email,
                            password:password
                        })
                    }
            
                    fetch('http://127.0.0.1:5000/loginCom', signin)
                    .then(resp => {
                        if(resp.status === 200)  {
                            //alert(resp.json());
                            
                            //console.log('You are signed in');
                            return resp.json();
                        } else {
                            return alert("Put in correct information");
                        } 
                    })
                    .then(data => {
                        if (data != undefined && data != "") {
                            sessionStorage.setItem("token", data.access_token); 
                            sessionStorage.setItem("user", 'true');
                            sessionStorage.setItem("username", email);
                            this.props.setData(
                                sessionStorage.getItem("token"), 
                                sessionStorage.getItem("user"), 
                                sessionStorage.getItem("username")
                            );
                            this.props.history.push('/homepage');
                            //this.props.setData(data.access_token, true);
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })
                } else {
                    alert("Error");
                    return;
                }
            } else {
                alert("Enter User Type");
                return;
            }
        } else {
            alert("Enter Details");
            return;
        }
   };

    render() {
        //console.log(this.props);
        //this.state.token = sessionStorage.getItem("token");
        return( 
            <div>
                <h1 className="header">Sign In</h1>
                    <form onSubmit={this.handleSignIn}>
                    <div className="inputFields">
                        <label>
                            Username:
                            <input 
                                type="text" 
                                placeholder="Enter username" 
                                name="username" 
                            />
                        </label>
                    </div>
                    <div className="inputFields">
                        <label>
                            Password:
                            <input 
                                type="password" 
                                placeholder="Enter password" 
                                name="password"
                            />
                        </label>
                    </div>

                    <div className="inputFields">
                    <label>
                            Select user:
                            <Select 
                                options={ optionsUser} 
                                name="user"
                                />
                        </label>
                    </div>
                    
                    <div>
                        <button className="buttons">Sign In</button>
                    </div>      
                </form>
                <div><Link className="links" to='/'>Go Back</Link></div>
            </div>
        );
    }
};

//{this.state.token && this.state.token != "" && this.state.token != undefined ? <p>You are logged in with this token + {this.state.token}</p>:
const mapDispatchToProps = (dispatch) => {
    return {
        setData: (token, user, username) => { dispatch({type: 'SET_DATA', token: token, user: user, username: username})},
        setToken: (token) => {dispatch({type: 'SET_TOKEN', token: token})},
        setHasFilter: (hasfilter) => {dispatch({type: 'SET_HAS_FILTER', hasfilter: hasfilter})}

    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        username: state.username,
        hasfilter: state.hasfilter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

//<button onClick={this.handleToken}>Check</button>