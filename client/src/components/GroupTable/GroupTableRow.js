/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { format } from 'date-fns';

import './index.scss';

const GroupTableRow = ({
    group
}) => {
    const formattedCreatedDate = format(new Date(group.CreateDate), 'MM/dd/yyyy');
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
                  { formattedCreatedDate }
                </td>
            }
        </tr>
    );
}

export default GroupTableRow;