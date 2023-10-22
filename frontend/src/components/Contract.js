import React from 'react';
import Select from 'react-select';

class Contract extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className ="boxed">
                <h4 className="headerApply">
                    <button 
                        className = "button applybutton" 
                        onClick={(e) => {
                            this.props.handleAccept(this.props.contract.conID, this.props.contract.email);
                        }}
                    >
                     Accept
                    </button>
                </h4>
                <div className="inputFields">
                <p>Contract Length: {this.props.contract.conlen}</p>
                </div>
                <div className="inputFields">
                <p>Contract Value: {this.props.contract.value}</p>
                </div>
                <div className="inputFields">
                <p>Date: {this.props.contract.date}</p>
                </div>
                <div className="inputFields">
                <p>Office or Remote: {this.props.contract.inORem ? "Office" : "Remote"}</p>
                </div>
                <div className="inputFields">
                <p>Developer Appling: {this.props.contract.email}</p>
                </div>
            </div>
        );
    }
    
}

export default Contract;
