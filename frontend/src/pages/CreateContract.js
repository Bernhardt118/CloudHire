import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Select from 'react-select';
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

  const contractLength= [
    { label: "1 Month", value: 1 },
    { label: "2 Month", value: 2 },
    { label: "3 Month", value: 3 },
    { label: "4 Month", value: 4 },
  ];

  const officeremote= [
    { label: "Office", value: true },
    { label: "Remote", value: false },

  ];

  const activeinactive= [
    { label: "Active", value: true },
    { label: "InActive", value: false },

  ];

class CreateContract extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateContract = this.handleCreateContract.bind(this);
        this.handleAddProgLang = this.handleAddProgLang.bind(this);
        this.handleDeleteProgLang = this.handleDeleteProgLang.bind(this);
        this.state = {
            proglanguage : []
        }
    }

    handleCreateContract(e) {
        e.preventDefault(e);

        const officeremote = e.target.elements.officeremote.value;
        const conlength = e.target.elements.conlength.value;
        const convalue = e.target.elements.convalue.value;
        const id = this.props.token;
        const active = e.target.elements.state.value;

        if (officeremote != "") {
            console.log(officeremote);
            if (!isNaN(conlength)) {
                console.log(conlength);
                if ( !isNaN(convalue)) {
                    console.log(convalue);
                    if (this.state.proglanguage.length != 0) {
                        console.log(this.state.proglanguage);
                        if (id != "") {
                            console.log(id);
                            if (active != "") {
                                console.log(active);
                                // Make a post request

                                const createcontract = {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        compname: this.props.username,
                                        conlen: conlength,
                                        iorem: officeremote,
                                        voc: convalue,
                                        active: active,
                                        proglan: this.state.proglanguage
                                    })
                                }
                        
                                fetch('http://127.0.0.1:5000/addContract', createcontract)
                                .then(resp => {
                                    if(resp.status === 200) {
                                        alert("You have created a new contract.")
                                        this.props.history.push('/profile');
                                        return resp.json();
                                    } else {
                                        return alert("Put in correct information");
                                    } 
                                })
                                .catch(error => {
                                    console.error("Error:", error);
                                })

                            } else {
                                alert("Add all information");
                                return;
                            }
                        } else {
                            alert("Error");
                            return; 
                        }
                    } else {
                        alert("Add all information");
                        return;
                    }
                } else {
                    alert("Enter real contract value");
                    return;
                }
            } else {
                alert("Add all information");
                return;
            }
        } else {
            alert("Add all information");
            return;
        }

    }

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

    render() {
        return(

            
            <div>
                <Header option={4}/>
                <form align="center" onSubmit={this.handleCreateContract}>
                    <div className="inputFields">
                    <label>
                        Contract Length (months):
                        <input 
                            type="number"
                            placeholder="months" 
                            name="conlength"
                            />
                    </label>
                    </div>

                    <div className="inputFields">
                    <label>
                        In Office of Remote:
                        <Select 
                            options={ officeremote } 
                            name="officeremote"
                            />
                    </label>
                    </div>

                    <div className="inputFields">
                        <label>
                            Contract Value:
                            <input 
                                type="number"
                                step=".01" 
                                placeholder="" 
                                name="convalue"
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
                        Active of InActive:
                        <Select 
                            options={ activeinactive } 
                            name="state"
                            />
                    </label>
                    </div>
                
                    <div>
                        <button className = "buttons" onSubmit={this.handleAddInfo}>Create contract</button>
                    </div>
                    
                </form>
                <Link className = "links" to='/homepage'>Go back</Link>
            </div>
        ); 
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        username: state.username
    }
}

export default connect(mapStateToProps)(CreateContract);