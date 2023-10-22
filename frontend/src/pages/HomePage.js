import React from "react";
import Header from '../components/Header';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Filter from '../components/Filter';
import BlockCompany from "../components/BlockCompany";

class HomePage extends React.Component {
    constructor(props) {
       super(props); 
       this.handleSetUpFilter = this.handleSetUpFilter.bind(this);
       this.handleCloseFilter = this.handleCloseFilter.bind(this);
       this.handleSetBlockCompany = this.handleSetBlockCompany.bind(this);
       this.handleSubmitBlockCompany = this.handleSubmitBlockCompany.bind(this);
       this.handleLogOut = this.handleLogOut.bind(this);
       this.handleCloseBlockCompany = this.handleCloseBlockCompany.bind(this);
       this.props.setHasFilter(false);
       this.state = {
            openfilter: false,
            openblockcompany: false
        };
    }

    handleSetUpFilter(e) {
        e.preventDefault(e);
        this.state.openfilter = true;
        this.forceUpdate();
    }

    handleCloseFilter() {
        // if (sessionStorage.getItem("data_is_set")) {
            
        // } else {
        //     alert("Data is undefined"); 
        // }
        // console.log(true);
        this.props.setHasFilter(true);
        this.state.openfilter = false;
        this.forceUpdate();
    }

    handleSetBlockCompany(e) {
        e.preventDefault(e);
        this.state.openblockcompany = true;
        this.forceUpdate();
    }

    handleCloseBlockCompany() {
        this.state.openblockcompany = false;
        this.forceUpdate();
    }

    handleSubmitBlockCompany(e) {
        e.preventDefault(e);
        const company = e.target.elements.company.value;

        //console.log(company);
        
        if (company != "") {
            const blockcompany = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.props.username,
                    comp: company
                })
            }
    
            fetch('http://127.0.0.1:5000/block', blockcompany)
            .then(resp => {
                if(resp.status === 200) {
                    alert("You have blocked company: ", company);
                    this.state.openblockcompany = false;
                    this.forceUpdate();
                    return  resp.json;
                } else {
                    alert("Error");
                    return;
                }
            })
            .catch(error => {
                console.log("Error:",error);
            })
        } else {
            alert("Add company");
            return;
        }
        //console.log(company);
        
    }

    handleLogOut(e) {
        e.preventDefault(e);
        const logout = {
            method: "POST",
        }

        fetch('http://127.0.0.1:5000/logout', logout)
        .then(resp => {
            if(resp.status === 200) {
                this.props.clearToken();
                sessionStorage.setItem("token", "");
                sessionStorage.setItem("user", "");
                sessionStorage.setItem("username", "");
                sessionStorage.setItem("data_is_set", "");
                this.props.setHasFilter(false);
                this.props.history.push('/');
                return  resp.json;
            } else {
                alert("Try logging out again");
                return;
            }
        })
        .catch(error => {
            console.log("Error:",error);
        })

        //console.log("Log out");
    }

    render() {
        if (this.props.user) {
            //Compony Home Page
            return (
                <div>
                    <Header 
                        option={2}
                        handleLogOut={this.handleLogOut}
                    />
                    <Link className="links" to='/createcontract'>
                         <button>Create new contract</button>
                    </Link>
                    <Link  className="links" to='/individualcontracts'>
                         <button>Individual contracts</button>
                     </Link>
                </div>
            ); 
        } else {
            //User Home Page
            return (
                <div>
                    <Header 
                        option={3} 
                        hasfilter={this.props.hasfilter}
                        handleSetUpFilter={this.handleSetUpFilter}
                        handleSetBlockCompany={this.handleSetBlockCompany}
                        handleLogOut={this.handleLogOut}
                    />
                    {
                        this.state.openblockcompany
                        &&
                        <BlockCompany
                            handleSubmitBlockCompany={this.handleSubmitBlockCompany}
                            handleCloseBlockCompany={this.handleCloseBlockCompany}
                        />
                    }
                    {
                        <Filter 
                            handleCloseFilter={this.handleCloseFilter}
                            //hasfilter={this.props.hasfilter}
                            openfilter={this.state.openfilter}
                        />}
                    {
                        !this.props.hasfilter 
                        && 
                        <p>"Please wait we are loading your contracts."</p>
                    }
                </div>
            ); 
        } 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearToken: () => {dispatch({type: 'CLEAR_TOKEN'})},
        setHasFilter: (hasfilter) => {dispatch({type: 'SET_HAS_FILTER', hasfilter: hasfilter})},
        //data_is_set:(data_is_set) => {dispatch({type: "DATA_IS_SET", data_is_set})}
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        hasfilter: state.hasfilter,
        username: state.username,
        //data_is_set: state.data_is_set
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(HomePage);



