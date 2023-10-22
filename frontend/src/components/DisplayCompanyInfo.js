import React from 'react';
import { connect } from 'react-redux';

class DisplayCompanyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.handleGetCompanyInfo = this.handleGetCompanyInfo.bind(this);
        this.handleGetCompanyContracts = this.handleGetCompanyContracts.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleGetCompanyInfo();
        this.handleGetCompanyContracts();
        this.state = {
            compInfo: null,
            companyContracts: null
        }
        
    }

    handleGetCompanyInfo() {
        //console.log(this.props.username);
        const getCompanyInfo = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                compname: this.props.username,  
            })
        }

        fetch('http://127.0.0.1:5000/companyProfile', getCompanyInfo)
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
            this.state.compInfo = data;
            //console.log(this.state.compInfo);
            //this.state.compInfo.logo = "https://i.pinimg.com/originals/6f/c0/5a/6fc05a42bd5d742e7c090deb4d254446.jpg"
            this.forceUpdate();
        })
        .catch(error => {
            console.error("Error:", error);
        })
    }

    handleGetCompanyContracts() {
        const getCompanyContracts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                compname: this.props.username,  
            })
        }

        fetch('http://127.0.0.1:5000/companyContracts', getCompanyContracts)
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
            this.state.companyContracts = data;
            this.forceUpdate();
            //console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        })
    }

    handleClick(e) {
        e.preventDefault();
        //console.log(this.state.compInfo);
    }

    render() {
        return (
            <div>
                <div>
                    <p className='inputFields'>Company Name: {this.props.username}</p>
                    <p className='inputFields'>General Industry: {this.state.compInfo ? this.state.compInfo.gen : ""}</p>
                    <p className='inputFields'>Logo:</p>
                    {   this.state.compInfo ?
                        this.state.compInfo.logo ?
                        <img className='profile_image'
                        src={this.state.compInfo.logo}
                        alt="new"
                        />
                        :
                        <p>No logo</p>
                        :
                        <p>No logo</p>
                    }
                    
                </div>
                <div>
                
                {this.state.companyContracts && this.state.companyContracts.map((contract) => (
                    <div className='boxed' key={contract.conID}>
                        <h5 className='headers'>Contract by: {contract.CompanyName}</h5>
                        <p className='inputFields'>Contract Length (months): {contract.conlen}</p>
                        <p className='inputFields'>In Office or Remote : {contract.inORem ? "Office" : "Remote"}</p>
                        <p className='inputFields'>Value (Rand): {contract.value}</p>
                        <p className='inputFields'>Active : {contract.active ? "Active" : "False"}</p>
                        <p className='inputFields'>Date : {contract.date}</p>
                        <p className='inputFields'>Programming Languages :</p>
                        
                    </div>
                ))}
                </div>
            </div>

            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        username: state.username
    }
}

export default connect(mapStateToProps)(DisplayCompanyInfo);