import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';
import EditProfile from '../components/EditProfile';
import { thisExpression } from 'babel-types';
import DisplayCompanyInfo from '../components/DisplayCompanyInfo';
import DisplayClientProfile from '../components/DisplayClientProfile';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.state = {
            edit : false 
        }
    }

    handleEditProfile(e) {
        e.preventDefault();
        this.state.edit = true;
        this.forceUpdate();
        //console.log("editprofile");
    }

    handleEditSubmit() {
        this.state.edit = false;
        this.forceUpdate();
        //console.log("sdaf");
    }

    handleDeleteAccount(e) {
        e.preventDefault(e);
        let usertype = "";
        if (this.props.user) {
            usertype = "company";
        } else {
            usertype = "client";
        }
        const deleteaccount = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.props.username,
                usertype: usertype
            })
        }


        fetch('http://127.0.0.1:5000/deleteaccount', deleteaccount)
            .then(resp => {
                if(resp.status === 200) {
                    //alert("Your filter has been set.");
                    alert("Your account have been deleted.");
                    this.props.history.push("/");
                    return resp.json();
                } else {
                    alert('Error');
                }
            })
            .catch(error => {
                console.log("Error", error);
            })
        //console.log("delete");
    }

    render() {
        if (this.props.user) {
            return (
                <div>
                    <Header className="headers"
                        option={6} 
                        handleDeleteAccount={this.handleDeleteAccount}
                        handleEditProfile={this.handleEditProfile}
                    />
                 <div className='inputFields'>
                    {
                        this.state.edit
                        &&
                        <EditProfile handleEditSubmit={this.handleEditSubmit}/>
                    }
                </div>
                <div>
                    <DisplayCompanyInfo/>
                </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Header className="headers"
                        option={5} 
                        handleDeleteAccount={this.handleDeleteAccount}
                        handleEditProfile={this.handleEditProfile}
                    />
                    {
                        this.state.edit
                        &&
                        <EditProfile handleEditSubmit={this.handleEditSubmit}/>
                    }

                    <div>
                        <DisplayClientProfile/>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        username: state.username
    }
}

export default connect(mapStateToProps)(Profile);