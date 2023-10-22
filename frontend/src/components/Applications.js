import React from 'react';
import Application from './Application';

const Applications = (props) => {
    return (
        <div>
            {  props.applications && 
                props.applications.map((application) =>(
                    <Application
                        key={application.conID}
                        application={application}
                        handleApply={props.handleApply}
                    />
                ))
            }
        </div>
    );
}

export default Applications;
//{props.applications.length === 0 && <p>No applications is retrived</p>}