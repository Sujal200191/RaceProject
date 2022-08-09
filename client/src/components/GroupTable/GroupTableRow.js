/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import './index.scss';

const GroupTableRow = ({
    group
}) => {
    return (
        <tr className="table-row-text-color">
            { group.GroupId && 
                <td className="patient-table-patient-name-data" id={group.GroupId} obj={group}>
                  { group.GroupId }
                </td>
            }
            { group.GroupName && 
                <td className="underline">
                  { group.GroupName }
                </td>
            }
            { group.Path &&
                <td>
                  { group.Path  }
                </td>
            }
            { group.Arn &&
                <td>
                  { group.Arn }
                </td>
            }
            { group.CreateDate &&
                <td>
                  { group.CreateDate }
                </td>
            }
        </tr>
    );
}

export default GroupTableRow;