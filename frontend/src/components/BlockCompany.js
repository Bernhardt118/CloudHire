import React from 'react';

export default class BlockCompany extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitBlockCompany = this.handleSubmitBlockCompany.bind(this);
    }

    handleSubmitBlockCompany(e) {
        e.preventDefault();
        this.props.handleSubmitBlockCompany();
    }

    render() {
        return(
            <div>
                <h3>BlockCompany</h3>
                <form onSubmit={this.props.handleSubmitBlockCompany}>
                    <div className="inputFields">
                    <label>
                        Enter Company:
                        <input 
                            type="text" 
                            placeholder="Enter Company" 
                            name="company"
                        />
                    </label>
                    </div>
                    <button>Submit</button>
                </form>

                <div>
                    <button onClick={this.props.handleCloseBlockCompany}>Close</button>
                </div>
            </div>
        )
    }
}