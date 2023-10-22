import React from 'react';
import Select from 'react-select';
import Applications from "../components/Applications";
import { connect } from 'react-redux';

const type = [
    { label: "Contract Length", value: "conlen" },
    { label: "In Office or Remote", value: "officeremote" },
    { label: "Value", value: "value" },
    { label: "Programming Languages", value: "proglang" },
    { label: "Date", value: "date" }
  ];

  const conlength = [
    { label: "Ascending", value: "asc" },
    { label: "Decending", value: "desc" }
  ];

  const value = [
    { label: "Ascending", value: "asc" },
    { label: "Decending", value: "desc" }
  ];

  const date = [
    { label: "Newest", value: "new" },
    { label: "Oldest", value: "old" }
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

  const officeremote = [
    { label: "Office", value: "ioffice" },
    { label: "Remote", value: "remote" }
  ];

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitFilter = this.handleSubmitFilter.bind(this);
        this.handleSetBool = this.handleSetBool.bind(this);
        this.handleApply = this .handleApply.bind(this);
        this.handlePostFilter("init", "");
        this.state = {
            officeremote : false,
            conlength : false,
            value : false,
            proglang : false,
            date : false,
            applications: null,
            //hasfilter: this.props.hasfilter
        }
    }

    handleApply(option) {
        const apply = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.props.username,
                conID: option
            })
        }


        fetch('http://127.0.0.1:5000/apply', apply)
            .then(resp => {
                if(resp.status === 200) {
                    //alert("Your filter has been set.");
                    alert("You have applied for the contract.")
                    this.forceUpdate();
                    return resp.json();
                } else {
                    alert('Could not get data.');
                }
            })
            .catch(error => {
                console.log("Error", error);
            })
        //console.log("apply");
    }

    handleSetBool(e) {
        const type = e.value;
        //console.log(e.value);
        if (type === "conlen") {
            this.state.conlength = true;
            this.state.officeremote = false;
            this.state.value = false;
            this.state.proglang = false;
            this.state.date = false;
            this.forceUpdate();
        } else if (type === "officeremote") {
            this.state.conlength = false;
            this.state.officeremote = true;
            this.state.value = false;
            this.state.proglang = false;
            this.state.date = false;
            this.forceUpdate();
        } else if (type === "value") {
            this.state.conlength = false;
            this.state.officeremote = false;
            this.state.value = true;
            this.state.proglang = false;
            this.state.date = false;
            this.forceUpdate();  
        } else if (type === "proglang") {
            this.state.conlength = false;
            this.state.officeremote = false;
            this.state.value = false;
            this.state.proglang = true;
            this.state.date = false;
            this.forceUpdate();
        } else if (type === "date") {
            this.state.conlength = false;
            this.state.officeremote = false;
            this.state.value = false;
            this.state.proglang = false;
            this.state.date = true;
            this.forceUpdate();
        }
       // console.log(this.state.conlength);
    }

    handlePostFilter(type, option){
        //console.log("Type : ",type);
        //console.log("Option : ",option);
        const filter = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: type,
                info: option,
                email: this.props.username
            })
        }


        fetch('http://127.0.0.1:5000/filter', filter)
            .then(resp => {
                if(resp.status === 200) {
                    //alert("Your filter has been set.");
                    return resp.json();
                } else {
                    alert('Could not get data.');
                }
            })
            .then(data => {
                // if (data) {
                //     console.log("data",true);
                //     sessionStorage.setItem("data_is_set", "true");
                // } else {
                //     console.log("data",false);
                //     sessionStorage.setItem("data_is_set", "");
                // }

                this.state.applications = data;
                //this.state.hasfilter = true;
                //console.log("Filter: ",data);
                this.forceUpdate()
                this.props.handleCloseFilter();
            })
            .catch(error => {
                console.log("Error", error);
            })
    }

    handleSubmitFilter(e) {
        e.preventDefault(e);
        const type = e.target.elements.type.value;

        if (type !== "") {
            //console.log(test);
            //set up the connection here!!!!
            if (type === "conlen") {
               const conlength = e.target.elements.conlength.value;
               if (conlength != "") {
                this.handlePostFilter(type, conlength);
               } else {
                   alert("Enter all data");
               } 
            } else if (type === "officeremote") {
                const officeremote = e.target.elements.officeremote.value;
                if (officeremote != "") {
                    this.handlePostFilter(type, officeremote);
                } else {
                    alert("Enter all data");
                } 
            } else if (type === "value") {
                const convalue = e.target.elements.convalue.value;
                if (convalue != "") {
                    this.handlePostFilter(type, convalue);
                } else {
                    alert("Enter all data");
                }
            } else if (type === "proglang") {
                const proglang = e.target.elements.proglang.value;
                if (proglang != "") {
                    this.handlePostFilter(type, proglang);
                } else {
                    alert("Enter all data");
                }
            } else if (type === "date") {
                const date = e.target.elements.date.value;
                if (date != "") {
                    this.handlePostFilter(type, date);
                } else {
                    alert("Enter all data");
                }
            } else {
                alert("error");
                return;
            }

        } else {
            alert("Enter all the data");
            return;
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.openfilter
                    &&
                    <h3 className = "inputFields" >Set up filter</h3>
                }
                
                {this.props.openfilter
                    &&
                <form onSubmit={this.handleSubmitFilter}>
                    <div>
                    
                        <div className="inputFields">
                            <label>
                                Select type:
                                <Select 
                                    onChange={this.handleSetBool}
                                    options={ type }
                                    name="type" 
                                />
                            </label>
                        </div> 

                    
                    { this.state.conlength
                        &&
                        <div className="inputFields">
                        <label>
                            Contract Length:
                            <Select 
                                options={ conlength }
                                name="conlength" 
                            />
                        </label>
                        </div>  
                    }

                    { this.state.officeremote
                        &&
                        <div className="inputFields">
                        <label>
                            Office or Remote:
                            <Select 
                                options={ officeremote }
                                name="officeremote" 
                            />
                        </label>
                        </div>  
                    }
                    
                    { this.state.value
                        &&
                        <div className="inputFields">
                        <label>
                            Value:
                            <Select 
                                options={ value }
                                name="convalue" 
                            />
                        </label>
                        </div>  
                    }
                    
                    {   this.state.proglang
                        &&
                        <div className="inputFields">
                        <label>
                            Programming Languages:
                            <Select 
                                options={ optionsProgrammingLanguages }
                                name="proglang" 
                            />
                        </label>
                        </div>  
                    }
                    
                    {   this.state.date
                        &&
                        <div className="inputFields">
                        <label>
                            Date:
                            <Select 
                                options={ date }
                                name="date" 
                            />
                        </label>
                        </div>  
                    }                          
                    </div>
                    <div>
                        <button className = "buttons">Submit</button>
                    </div>
                </form>
                }

                {
                    this.props.openfilter
                    &&
                    <div>
                        <button className='buttons' onClick={this.props.handleCloseFilter}>Cancel</button>
                    </div>
                }

                <div>
                {
                    //this.props.hasfilter \
                    true
                    && 
                    <Applications 
                        applications={this.state.applications}
                        handleApply={this.handleApply}
                    />
                }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //data_is_set:(data_is_set) => {dispatch({type: "DATA_IS_SET", data_is_set})}
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.username
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

