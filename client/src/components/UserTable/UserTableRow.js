/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { format } from 'date-fns';

import './index.scss';

const UserTableRow = ({
    user
}) => {
    const formattedUpdateDate = format(new Date(user.CreateDate), 'MM/dd/yyyy');
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
                  { formattedUpdateDate }
                </td>
            }
        </tr>
    );
}

export default UserTableRow;