import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import ProgLangOption from '../components/ProgLangOption';

const actions = [
    { label: "Software Development", value: "Software Development" },
    { label: "Web Develpoment", value: "Web Develpoment" },
    { label: "Machine Learning", value: "Machine Learning" },
    { label: "Data Engineering", value: "Data Engineering" },
  ];

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

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditClientAvatar = this.handleEditClientAvatar.bind(this);
        this.handleEditClientPassword = this.handleEditClientPassword.bind(this);
        this.handleEditClientProgLan = this.handleEditClientProgLan.bind(this);
        this.handleEditCompanyGenIndus = this.handleEditCompanyGenIndus.bind(this);
        this.handleEditCompanyLogo = this.handleEditCompanyLogo.bind(this);
        this.handleEditCompanyPassword = this.handleEditCompanyPassword.bind(this);
        this.handleAddProgLang = this.handleAddProgLang.bind(this);
        this.handleDeleteProgLang = this.handleDeleteProgLang.bind(this);
        this.handleEditClientExperience = this.handleEditClientExperience.bind(this);
        this.state = {
            proglanguage: [],
        };
    }

//Handle for Client

    handleEditClientAvatar(e) {
        e.preventDefault();
        
        this.props.handleEditSubmit();
    }

    handleEditClientProgLan(e) {
        e.preventDefault(e);
        const proglang = this.state.proglanguage;

        if (this.state.proglanguage.length != 0) {
            // make a post request to data base.

            //added this kak

            const EditClientProgLan = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.props.username,
                    type: "progLan",
                    info: proglang
                })
            }
    
            fetch('http://127.0.0.1:5000/editClientProfile', EditClientProgLan)
            .then(resp => {
                if(resp.status === 200) {
                    alert("Your programming languages have been changed.")
                    this.props.handleEditSubmit();
                    return resp.json();
                } else {
                    return alert("Put in correct information");
                } 
            })
            .then(data => {
                if (data != undefined && data != "") {
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })


            //till here


            
        } else {
            alert("Add programming languages.");
            return;
        }
    }

    handleEditClientPassword(e) {
        e.preventDefault(e);
        
        const password = e.target.elements.password.value;
        const confirmpassword = e.target.elements.congfirmpassword.value;

        if (password != "" && confirmpassword != "") {
            if (password === confirmpassword) {
                //make a post request to database

                //added this kak
                const EditClientPassword = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.props.username,
                        type: "password",
                        info: password
                    })
                }
        
                fetch('http://127.0.0.1:5000/editClientProfile', EditClientPassword)
                .then(resp => {
                    if(resp.status === 200) {
                        alert("Your password has been changed");
                        this.props.handleEditSubmit();
                        return resp.json();
                    } else {
                        return alert("Put in correct information");
                    } 
                })
                .then(data => {
                    if (data != undefined && data != "") {
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                })
    
                //till here



                
            } else {
                alert("Passwords do not match");
                return;
            }
        } else {
            alert("Enter all details");
            return;
        }

        
    }

    handleEditClientExperience(e) {
        e.preventDefault(e);

        const experience = e.target.elements.experience.value;

        if (experience != "") {
            //make a post request to database

             //added this kak
             const EditClientExperience = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.props.username,
                    type: "experience",
                    info: experience
                })
            }
    
            fetch('http://127.0.0.1:5000/editClientProfile', EditClientExperience)
            .then(resp => {
                if(resp.status === 200) {
                    alert("Your experience has been changed.")
                    this.props.handleEditSubmit();
                    return resp.json();
                } else {
                    return alert("Put in correct information");
                } 
            })
            .then(data => {
                if (data != undefined && data != "") {
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })

            //till here


            
        } else {
            alert("Add experience.");
            return;
        }
    }

//Handle for Company

    handleEditCompanyGenIndus(e) {
        e.preventDefault();
        const genindus = e.target.elements.genindustry.value;

        if (genindus != "") {
            //send a post request to database

            //added this kak
            const EditCompanyGenIndus = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    companyName: this.props.username,
                    type: "genindus",
                    info: genindus
                })
            }
    
            fetch('http://127.0.0.1:5000/editCompanyProfile', EditCompanyGenIndus)
            .then(resp => {
                if(resp.status === 200) {
                    alert("Your General Industry has been changed.");
                    this.props.handleEditSubmit();
                    return resp.json();
                } else {
                    return alert("Put in correct information");
                } 
            })
            .then(data => {
                if (data != undefined && data != "") {
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })

            //till here


            
        } else {
            alert("Select general industry");
            return;
        } 
    }

    handleEditCompanyLogo(e) {
        e.preventDefault(e);
        //const logo = e.target.elements.logo.value;
        const logo = "dasf";

        if (logo != "") {
            //make a post request to database

            //added this kak
            const EditCompanyLogo = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    logo: logo
                })
            }
    
            fetch('http://127.0.0.1:5000/editCompanyProfile', EditCompanyLogo)
            .then(resp => {
                if(resp.status === 200) {
                    alert("Your logo has been changed.");
                    this.props.handleEditSubmit();
                    return resp.json();
                } else {
                    return alert("Put in correct information");
                } 
            })
            .then(data => {
                if (data != undefined && data != "") {
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })

            //till here

            // alert("Your logo has been changed.");
            // this.props.handleEditSubmit();
        } else {
            alert("Upload logo");
            return;
        }
    }

    handleEditCompanyPassword(e) {
        e.preventDefault(e);

        const password = e.target.elements.password.value;
        const confirmpassword = e.target.elements.congfirmpassword.value;

        if (password != "" && confirmpassword != "") {
            if (password === confirmpassword) {
                //make a post request to database

                //added this kak
            const EditCompanyPassword = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    companyName: this.props.username,
                    type: "password",
                    info: password,
                })
            }
    
            fetch('http://127.0.0.1:5000/editCompanyProfile', EditCompanyPassword)
            .then(resp => {
                if(resp.status === 200) {
                    alert("Your password has been changed");
                    this.props.handleEditSubmit();
                    return resp.json();
                } else {
                    return alert("Put in correct information");
                } 
            })
            .then(data => {
                if (data != undefined && data != "") {
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })

            //till here

                
            } else {
                alert("Passwords do not match");
                return;
            }
        } else {
            alert("Enter all details");
            return;
        }
    }

//Adding programming languages

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
        if (this.props.user) {
            return (
                <div>
                    <h4 className='header'>Edit Company</h4>
                    <form onSubmit={this.handleEditCompanyPassword}>
                        <div className="inputFields">
                        <label>
                            Password:
                            <input 
                                type="text" 
                                placeholder="Enter Password" 
                                name="password"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            Confirm Password:
                            <input 
                                type="text" 
                                placeholder="Enter Password" 
                                name="congfirmpassword"
                            />
                        </label> 
                        </div>
                        <button className='editbutton'>Edit password</button>
                    </form>
                        
                    <form onSubmit={this.handleEditCompanyLogo}>
                        <div className="inputFields">
                        <label>
                            Upload Logo URL:
                            <input 
                                type="url" 
                                name="logo"
                            />
                        </label> 
                        </div>
                        <button className='editbutton'>Edit Logo</button>
                    </form>

                    <form onSubmit={this.handleEditCompanyGenIndus}>
                        <div className="inputFields">
                        <label>
                            General Industry:
                            <Select 
                                options={ actions }
                                name="genindustry" 
                            />
                        </label>
                        </div>
                        <button className='editbutton'>Edit General Industry</button>
                    </form>
                    <button onClick={this.props.handleEditSubmit}>Cancle</button>
                </div>
            )
        } else {
            return (
                <div>
                    <h4 className='header'>Edit Client</h4>
                    <form onSubmit={this.handleEditClientAvatar}>
                        <div className="inputFields">
                        <label>
                            Upload Avatar URL:
                            <input 
                                type="url" 
                                name="avatar"
                            />
                        </label>
                        </div>
                        <button className='editbutton'>Edit Avatar</button>
                    </form>
                        
                    <form onSubmit={this.handleEditClientProgLan}>
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
                        <button className='editbutton'>Edit programming languages</button>
                    </form>

                    <form onSubmit={this.handleEditClientExperience}>
                        <div className="inputFields">
                        <label>
                            Add experience:
                            <Select 
                                options={ optionsExperience } 
                                name="experience"
                                />
                        </label>
                        </div>
                        <button className='editbutton'>Edit Experience</button>
                    </form>

                    <form onSubmit={this.handleEditClientPassword}>
                        <div className="inputFields">
                        <label>
                            Password:
                            <input 
                                type="text" 
                                placeholder="Enter Password" 
                                name="password"
                            />
                        </label>
                        </div>
                        <div className="inputFields">
                        <label>
                            Confirm Password:
                            <input 
                                type="text" 
                                placeholder="Enter Password" 
                                name="congfirmpassword"
                            />
                        </label> 
                        </div>
                        <button className='editbutton'>Edit password</button>
                    </form>
                    <button className='buttons' onClick={this.props.handleEditSubmit}>Cancel</button>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        username: state.username
    }
}

export default connect(mapStateToProps)(EditProfile);