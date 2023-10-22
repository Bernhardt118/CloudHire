import React from 'react';
import { connect } from 'react-redux';

class DisplayCompanyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.handleGetClientContracts = this.handleGetClientContracts.bind(this);
        this.handleGetClientInfo = this.handleGetClientInfo.bind(this);
        this.handleGetClientContracts();
        this.handleGetClientInfo();
        this.state = {
            clientInfo:[],
            clientContracts: []
        }
    }

    handleGetClientInfo() {
        const getClientInfo = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.props.username,  
            })
        }

        fetch('http://127.0.0.1:5000/clientProfile', getClientInfo)
        .then(resp => {
            if(resp.status === 200) {
                return resp.json();
            } else {
                return alert("Put in correct information");
            } 
        })
        .then(data => {
            if (data != undefined && data != "") {
            }
            this.state.clientInfo = data;
            //console.log("GetClient Info");
            //Sconsole.log(data);
            this.forceUpdate();
        })
        .catch(error => {
            console.error("Error:", error);
        })
    }

    handleGetClientContracts() {
        const getClientContract = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.props.username,  
            })
        }

        fetch('http://127.0.0.1:5000/clientContracts', getClientContract)
        .then(resp => {
            if(resp.status === 200) {
                return resp.json();
            } else {
                return alert("Put in correct information");
            } 
        })
        .then(data => {
            if (data != undefined && data != "") {
            }
            this.state.clientContracts = data;
            //console.log("GetClientContracts")
            console.log(data);
            this.forceUpdate();
        })
        .catch(error => {
            console.error("Error:", error);
        })
    }

    render() {
        return(
            <div>
                <p className='inputFields'>Email : {this.state.clientInfo ? this.props.username : ""}</p>
                <p className='inputFields'>Avatar :</p>
                {   this.state.clientInfo ?
                    this.state.clientInfo.avatar ?
                    <img className='profile_image'
                    src={this.state.clientInfo.avatar}
                    alt="new"
                    />
                    :
                    <p>No logo</p>
                    :
                    <p>No logo</p>
                }

                <p className='inputFields'>Programming Languages</p>

                <p className='inputFields'>Total Earned: {this.state.clientInfo ? this.state.clientInfo.totearn : ""}</p>
                {this.state.clientInfo && this.state.clientContracts.map((contract) => (
                    <div className='boxed' key={contract.conID}>
                        <h5>Company : {contract.CompanyName}</h5>
                        <p>Active: {contract.active ? "Active" : "Inactive"}</p>
                        <p>Date: {contract.date}</p>
                        <p>Office or Remote: {contract.inORem ? "Office" : "Remote"}</p>
                        <p>Value: {contract.value}</p>
                        <p>Pending or Accepted: {contract.pending ? "Accepted" : "Pending"}</p>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        username: state.username
    }
}

export default connect(mapStateToProps)(DisplayCompanyInfo);

// {this.state.profileUser.proglan.map((prog) => (
//     <div key={prog.id}>
//         <p>{prog.lang}</p>
//     </div>
// ))}

// <img className='profile_image'
// src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80"
// alt="new"

// />