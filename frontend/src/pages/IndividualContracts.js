import React from 'react';
import { Link } from 'react-router-dom';
import Contracts from '../components/Contracts';
import { connect } from 'react-redux';

class IndividualContracts extends React.Component {
    constructor(props) {
        super(props);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleGetContracts = this.handleGetContracts.bind(this);
        this.handleGetContracts();
        this.state = {
            contracts: [],
        }
    }

    handleAccept(option, email) {
        console.log(option);
        console.log(email);
        const accept = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                companyname: this.props.username,
                conID: option,
                email: email
            })
        }


        fetch('http://127.0.0.1:5000/accept', accept)
            .then(resp => {
                if(resp.status === 200) {
                    //alert("Your filter has been set.");
                    //console.log("Accept");
                    alert("You have accepted a contract.");
                    this.forceUpdate();
                    return resp.json();
                } else {
                    alert('Error');
                }
            })
            .catch(error => {
                console.log("Error", error);
            })
        //in here make a Accept

    }

    handleGetContracts() {
        const getcontracts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                companyname: this.props.username,  
            })
        }

        fetch('http://127.0.0.1:5000/getcontracts', getcontracts)
        .then(resp => {
            if(resp.status === 200) {
                this.forceUpdate();
                return resp.json();
            } else {
                return alert("Could not get data.");
            } 
        })
        .then(data => {
            if (data != undefined && data != "") {
            }
            this.state.contracts = data;
            console.log(data);
            this.forceUpdate();
        })
        .catch(error => {
            console.error("Error:", error);
        })
    }

    render() {
        return (
            <div>
                <h1 className="header">Individual Contracts</h1>
                <Contracts
                    contracts={this.state.contracts}
                    //clients={this.state.clients}
                    handleAccept={this.handleAccept}
                />
                <Link className='links' lassName="links" to='/homepage'>Go back</Link>
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

export default connect(mapStateToProps)(IndividualContracts);