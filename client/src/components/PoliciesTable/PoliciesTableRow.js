/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { format } from 'date-fns';

import './index.scss';

const PoliciesTableRow = ({
    policies
}) => {
    const formattedUpdateDate = format(new Date(policies.UpdateDate), 'MM/dd/yyyy');
    return (
        <tr className="table-row-text-color">
            { policies.PolicyId && 
                <td className="patient-table-patient-name-data" id={policies.PolicyId} obj={policies}>
                  { policies.PolicyId }
                </td>
            }
            { policies.PolicyName && 
                <td className="underline">
                  { policies.PolicyName }
                </td>
            }
            { policies.Path &&
                <td>
                  { policies.Path  }
                </td>
            }
            { policies.Arn &&
                <td>
                  { policies.Arn }
                </td>
            }
            { policies.UpdateDate &&
                <td>
                  { formattedUpdateDate }
                </td>
            }
        </tr>
    );
}

export default PoliciesTableRow;