import React from 'react';

import './index.scss';
import GroupTableRow from './GroupTableRow';

const GroupsTable = ({groups}) => {
    // eslint-disable-next-line no-console
    console.log("Groups received in groupTable:::::", groups);

    const getGroupTableBody = () => {
        return groups.map((object, index) => {
            return <GroupTableRow group={object} key={index} />
        })
    } 

    return(
            <table className='responsive pr-3' data-pagination='true' data-click-to-select='true'>
                <thead className='table-header' style={{'color':'#2E363E'}}>
                    <tr>
                        <th>Group Id</th>
                        <th>Group Name</th>
                        <th>Path</th>
                        <th>Arn</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        getGroupTableBody()
                    }
                </tbody>
            </table>
    );
}

export default GroupsTable;