import React from 'react';

import './index.scss';
import PoliciesTableRow from './PoliciesTableRow';

const PoliciesTable = ({policies}) => {
    // eslint-disable-next-line no-console
    console.log("Policies received in PoliciesTable:::::", policies);

    const getPolicyTableBody = () => {
        return policies.map((object, index) => {
            return <PoliciesTableRow policies={object} key={index} />
        })
    } 

    return(
            <table className='responsive pr-3' data-pagination='true' data-click-to-select='true'>
                <thead className='table-header' style={{'color':'#2E363E'}}>
                    <tr>
                        <th>Policy Id</th>
                        <th>Policy Name</th>
                        <th>Path</th>
                        <th>Arn</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        getPolicyTableBody()
                    }
                </tbody>
            </table>
    );
}

export default PoliciesTable;