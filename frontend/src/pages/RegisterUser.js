import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import validator from 'validator';
import ProgLangOption from '../components/ProgLangOption';
import { connect } from 'react-redux';

const optionsProgrammingLanguages = [
    { label: "Java", value: "java" },
    { label: "React", value: "react" },
    { label: "Python", value: "python" },
    { label: "C++", value: "Cplusplus" },
    { label: "C", value: "C" },
    { label: "Csharp", value: "Csharp" },
    { label: "Assembly", value: "Assem" },
  ];

const optionsExperience = [
    { label: "> 1 year", value: "1 year" },
    { label: "> 2 years", value: "2 years" },
    { label: "> 5 years", value: "5 years" },
    { label: "> 10 years", value: "10 years" },
  ];
  

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegisterUser = this.handleRegisterUser.bind(this);
        this.handleAddProgLang = this.handleAddProgLang.bind(this);
        this.handleDeleteProgLang = this.handleDeleteProgLang.bind(this);
        this.state = {
            proglanguage: [],
        };
    }

    handleRegisterUser(e) {
        e.preventDefault();
        
        const avatar = e.target.elements.avatar.value;
        const email = e.target.elements.email.value.trim();
        const experience = e.target.elements.experience.value.trim();
        const password = e.target.elements.password.value;
        const confirmpassword = e.target.elements.congfirmpassword.value;

        if(validator.isEmail(email)){
            console.log(email);
            if (this.state.proglanguage.length !== 0){
                console.log("Something is entered into the proglang array");
                if(experience !== "") {
                    console.log(experience);
                    if(password !== "" && confirmpassword !== ""){
                        if( password === confirmpassword) {
                            if (validator.isURL(avatar)) {
                                console.log(password);
                                console.log(confirmpassword);
                                console.log("Your registration is complete");
                                //console.log(this.state.proglang);
                                const jsonProg = JSON.stringify(this.state.proglanguage);
                                console.log(jsonProg);
                                console.log(this.state.proglanguage);

                                //Posting data to the server
                                const registeruser = {
                                    method: "POST",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        email: email,
                                        password: password,
                                        avatar: avatar,
                                        progLan: this.state.proglanguage
                                    })
                                }

                                console.log(registeruser);

                                //console.log(registeruser);

                                fetch('http://127.0.0.1:5000/user_register', registeruser)
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
                                alert("Enter a Avatar URL.");
                                return;
                            }
                            
                            
                        } else {
                            alert("Your passwords do not match");
                            return;
                        }
                    } else {
                        alert("Enter your password");
                        return;
                    }
                }else{
                    alert("Enter your experience");
                    return;
                }
            } else {
                alert("Enter a programming language");
                return;
            }
        } else {
            alert("Invalid email");
            return;
        }
    }

//Adding the value to an array
    handleAddProgLang(e) {
        //e.preventDefault();
        const option = e.value;
        if(!option){
            alert("Enter valid option");
            return;
        } else if(this.state.proglanguage.indexOf(option) > -1) {
            alert("You allready added this option");
            return;
        }
        console.log(option);
        this.setState((prevState) => ({
            proglanguage: prevState.proglanguage.concat([option])
        }));
    }

    handleDeleteProgLang(optionRemove) {
        this.setState((prevState) => ({
            proglanguage: prevState.proglanguage.filter((option) => optionRemove !== option)
        }));
    }

    render() {
        return (
            <div>
                <h1 className="header">Register User</h1>
                <form onSubmit={this.handleRegisterUser}>
                        <div className="inputFields">
                        <label>
                             User Email:
                            <input 
                                type="text" 
                                placeholder="Enter User Email" 
                                name="email"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            Upload Avatar URL:
                            <input 
                                type="url" 
                                name="avatar"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            Add programming languages:
                            <Select 
                                onChange={this.handleAddProgLang}
                                value={""}
                                options={ optionsProgrammingLanguages } 
                                name="proglanguage"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        {
                            this.state.proglanguage.map((option) => (
                                <ProgLangOption
                                    key={option}
                                    optionText={option}                                  
                                    handleDeleteProgLang={this.handleDeleteProgLang}
                                />
                            ))
                        }
                        </div>
                        <div className="inputFields">
                        <label>
                            Add experience:
                            <Select 
                                options={ optionsExperience } 
                                name="experience"
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
                                name="congfirmpassword"
                            />
                        </label> 
                        </div>
                        <div>
                            <button className='buttons'>Register</button>
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

export default connect(mapStateToProps)(RegisterUser);