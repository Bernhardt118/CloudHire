import React from 'react';

const Api = (props) => {
    return (
        <div className="mt-2">
            {/* display the article details if article is not None */}
            {props.apilist && props.apilist.map((apilist) => {
                return (
                    <div key={apilist.userId}>
                        <h2 className="text-primary"> {apilist.title} </h2>
                        <p>{apilist.name}</p>
                        <p>{apilist.degree}</p>
                    </div>
                )
            })}  
        </div>
    )
}

export default Api;