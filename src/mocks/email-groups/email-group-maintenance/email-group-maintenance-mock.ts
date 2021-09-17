import { IEmailGroupMaintenance } from '../../../interfaces/email-groups/email-group-maintenance/get-all-email-group-maintenance';
import { IGetEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/get-email-group';

export const emailGroupMaintenanceResponse: IEmailGroupMaintenance[] = [
    {
        id: 1,
        name: 'EmailGroup1',
        description: 'Defects Topic',
    },
    {
        id: 2,
        name: 'EmailGroup2',
        description: 'Defects Warrenting Rejection Topic',
    },
    {
        id: 3,
        name: 'EmailGroup3',
        description: 'Temperature monitoring device(TMD) Topic',
    },
    {
        id: 4,
        name: 'EmailGroup4',
        description: 'Category Topic',
    },
    {
        id: 5,
        name: 'EmailGroup5',
        description: 'Rejection Category Topic',
    },
    {
        id: 6,
        name: 'EmailGroup6',
        description: 'Temperature Topic',
    },
    {
        id: 7,
        name: 'EmailGroup7',
        description: 'Category',
    },
    {
        id: 8,
        name: 'EmailGroup8',
        description: 'Temperature Specific Topic',
    },
];

export const emailGroup: IGetEmailGroup = {
    id: 1,
    name: 'EmailGroup1',
    description: 'Email Group 1 Description',
    emailAddresses: [
        {
            id: 1,
            name: 'Arjun',
            emailAddress: 'arjun.neeliyath@gmail.com',
            doRemove: false,
            doValidate: false,
        },
        {
            id: 2,
            name: 'Liz',
            emailAddress: 'liz@gmail.com',
            doRemove: false,
            doValidate: false,
        },
        {
            id: 3,
            name: 'Sona',
            emailAddress: 'sona@safeway.com',
            doRemove: false,
            doValidate: false,
        },
    ],
};
