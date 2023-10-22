import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import validator from 'validator';
//import 'bootstrap/dist/css/bootstrap.min.css';
 
const actions = [
  { label: "Software Development", value: "Software Development" },
  { label: "Web Develpoment", value: "Web Develpoment" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Data Engineering", value: "Data Engineering" },
];


class RegisterCompony extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegisterCompony = this.handleRegisterCompony.bind(this);

    }

    handleRegisterCompony(e) {
        e.preventDefault();

        const logo = e.target.elements.logo.value;
        const compname = e.target.elements.compname.value.trim();
        const genindustry = e.target.elements.genindustry.value.trim();
        const password = e.target.elements.password.value;
        const confirmpassword = e.target.elements.confirmpassword.value;

        if(compname !== "") {
            console.log(compname);
            if(genindustry !== "") {
                console.log(genindustry);
                if(password !== "" && confirmpassword !== ""){
                    if( password === confirmpassword) {
                        if (validator.isURL(logo)) {
                            //console.log(password);
                            //console.log(confirmpassword);
                            //console.log("Your registration is complete");
                            const registercompany = {
                                method: "POST",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    companyname: compname,
                                    password: password,
                                    companylogo: logo,
                                    genin: genindustry
                                })
                            }

                            fetch('http://127.0.0.1:5000/company_reg', registercompany)
                                .then(resp => {
                                    if(resp.status === 200) {
                                        this.props.history.push('/signin');
                                        return resp.json();
                                    } else {
                                        alert('Error');
                                    }
                                })
                                .then(data => {
                                    console.log(data);
                                })
                                .catch(error => {
                                    console.log("Error", error);
                                })
                        } else {
                            alert("Enter a URL.")
                        }
                        
                    } else {
                        alert("Your passwords do not match");
                        return;
                    }
                } else {
                    alert("Enter your password");
                    return;
                }
            } else {
                alert("Enter your general industry");
                return;
            }
        } else {
            alert("Enter your compony name");
            return;
        }
    }

    render() {
        return (
            <div>
                <h1 className="header">Register Company</h1>
                <form onSubmit={this.handleRegisterCompony}>
                        <div className="inputFields">
                        <label>
                             Company Name:
                            <input 
                                type="text" 
                                placeholder="Enter Company Name" 
                                name="compname"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            General Industry:
                            <Select 
                                options={ actions }
                                name="genindustry" 
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            Password:
                            <input 
                                type="password" 
                                placeholder="Enter Password" 
                                name="password"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            Confirm Password:
                            <input 
                                type="password" 
                                placeholder="Enter Password" 
                                name="confirmpassword"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            Upload Logo URL:
                            <input 
                                type="url" 
                                name="logo"
                            />
                        </label> 
                        </div>
                        <div>
                            <button className="buttons">Register</button>
                        </div>
                    </form>
                <Link className="links" to='/'>Go Back</Link>
             </div>
        );    
    }
};

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(RegisterCompony);