/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import './index.scss';

const UserTableRow = ({
    user
}) => {
    return (
        <tr className="table-row-text-color">
            { user.UserId && 
                <td className="patient-table-patient-name-data" id={user.UserId} obj={user}>
                  { user.UserId }
                </td>
            }
            { user.UserName && 
                <td className="underline">
                  { user.UserName }
                </td>
            }
            { user.Path &&
                <td>
                  { user.Path  }
                </td>
            }
            { user.Arn &&
                <td>
                  { user.Arn }
                </td>
            }
            { user.CreateDate &&
                <td>
                  { user.CreateDate }
                </td>
            }
        </tr>
    );
}

export default UserTableRow;