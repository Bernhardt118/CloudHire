import React from 'react';
import Contract from '../components/Contract';

const Contracts = (props) => {
    return (
        <div>
            {   props.contracts &&
                props.contracts.map((contract) => (
                    <Contract
                        key={contract.conID}
                        contract={contract}
                        //clients={props.clients}
                        handleAccept={props.handleAccept}
                    />
                ))  
            }
        </div>
    );
}

export default Contracts;