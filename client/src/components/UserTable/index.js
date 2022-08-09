import React from 'react';

import './index.scss';
import UserTableRow from './UserTableRow';

const UserTable = ({users}) => {
    console.log("users received in usertAble:::::", users);
    const getUserTableBody = () => {
        // if(this.props.searchValue && this.props.searchValue !== null && this.props.filteredPatients.length == 0){
        //     return(
        //         <tr className='patient-table-search-error-container'>
        //             <td className='patient-table-search-error'>{`No Result found with value ${this.props.searchValue}`}</td>
        //         </tr>
        //     )    
        // }else{
        //     return this.props.patients.map((object, index) => {
        //         return <PatientTableRow patient={object} key={object._id} index={index} isEditGroup={ this.props.isEditGroup } handlePatientClick={ this.props.selectPatientRouter } adminSettings={ this.props.adminSettings } selectedPatients={ this.props.selectedPatients } setSelectedPatients={ this.props.setSelectedPatients }/>
        //     })
        // }
        return users.map((object, index) => {
            return <UserTableRow user={object} key={index} />
        })
    } 

    return(
            <table className='responsive pr-3' data-pagination='true' data-click-to-select='true'>
                <thead className='table-header' style={{'color':'#2E363E'}}>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Path</th>
                        <th>Arn</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        getUserTableBody()
                    }
                </tbody>
            </table>
    );
}

export default UserTable;