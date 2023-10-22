import React from 'react';

const Application = (props) => {
    return (
        <div className='boxed'>
            <h4 className='headerApply'>
                {props.application.CompanyName}
                <div></div>
                <button 
                    className = "button applybutton" 
                    onClick={(e) => {
                        props.handleApply(props.application.conID)
                    }}
                >
                 Apply
                </button>
            </h4>
            <div className="inputFields">
            <p>Contract Length: {props.application.conlen}</p>
            </div>
            <div className="inputFields">
            <p>Contract Value: {props.application.value}</p>
            </div>
            <div className="inputFields">
            <p>Date: {props.application.date}</p>
            </div>
            <div className="inputFields">
            <p>Office or Remote: {props.application.inORem ? "Office" : "Remote"}</p>
            </div>     
        </div>
    );
}

export default Application;