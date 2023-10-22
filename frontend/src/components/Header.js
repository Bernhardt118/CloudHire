import React from 'react';
import {Link} from 'react-router-dom'

//Tipe of Headers:
//1: CloudHire
//2: ComponyHomepage
//3: UserHomePage
//4: Default

const Header = (props) => {
    if (props.option == 1){
        return (
            <div className="header">
                <h2>
                    <HeaderCloudHire title={props.title}/>                
                </h2>
                </div>
        );
    } else if(props.option == 2){
        return (
            <div className="header">
                <h2>
                <HeaderCompanyHomePage 
                    title={props.title}
                    handleLogOut={props.handleLogOut}
                />
                </h2>
                </div>
        );
    } else if(props.option == 3) {
        return (
                <HeaderUserHomePage 
                    title={props.title} 
                    hasfilter={props.hasfilter}
                    handleSetUpFilter={props.handleSetUpFilter}
                    handleSetBlockCompany={props.handleSetBlockCompany}
                    handleLogOut={props.handleLogOut}
                />
        );
    } else if(props.option == 4) {
        return (
                <h2 className="header">
                <HeaderDefault title={props.title}/>
                </h2>
        );
    } else if(props.option == 5) {
        return (
            <div className='header'>
                <h2>
            <HeaderProfile
                title="User Profile"
                
                handleDeleteAccount={props.handleDeleteAccount}
                handleEditProfile={props.handleEditProfile}
            />
            </h2>
            </div>
        )
    }else if(props.option == 6) {
        return (
            <div className='header'>
                <h2>
            <HeaderProfile
                title="Company Profile"
                
                handleDeleteAccount={props.handleDeleteAccount}
                handleEditProfile={props.handleEditProfile}
            />
            </h2>
            </div>
        )
    }
};

const HeaderCloudHire = (props) => {
    return (
        <div className="header">
            <h1 className = "header"> 
                <div className = "container">{props.title}</div>
            </h1>
            <h2 className="header">
                <div className="container">
                <Link  className="links" to="/signin"> Sign In </Link>
                <span class="seperator">|</span>
                <Link  className="links" to="/registeruser"> Register User </Link>
                <span class="seperator">|</span>
                <Link  className="links" to="/registercompany">Register Company</Link>
                </div>
            </h2>
        </div>
    );
};

const HeaderCompanyHomePage = (props) => {
    return(
        <div>
            <h3>
                {props.title}
                </h3>
                <Link to='/profile'>
                    <button className="buttons">Profile</button>
                </Link>
                <button className="buttons" onClick={props.handleLogOut}>Log Out</button>
           
        </div>
    );
};

const HeaderUserHomePage = (props) => {
    return (
        <div>
            <h3 className="header">
                {props.title}
                </h3>
                <form className="container">
                <button className="buttons"
                    disabled={!props.hasfilter}
                    onClick={props.handleSetBlockCompany}
                >
                Block Company
                </button>
                <button className="buttons" onClick={props.handleSetUpFilter}>Set up filter</button>
                <Link to='profile'>
                    <button className="buttons">Profile</button>
                </Link>
                <button className="buttons" onClick={props.handleLogOut}>Log Out</button>
                </form>
        </div>
            
    );
}

const HeaderDefault = (props) => {
    return (
        <div className="header">
            <h3>
                {props.title}
            </h3>
        </div>
    );
}

const HeaderProfile = (props) => {
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={props.handleEditProfile}>Edit Profile</button>
                <button onClick={props.handleDeleteAccount}>Delete Account</button>
            </h3>
        </div>
    )
}



Header.defaultProps = {
    title: 'Cloud Hire'
};

export default Header;