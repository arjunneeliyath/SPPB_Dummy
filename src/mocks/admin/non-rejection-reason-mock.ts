import { INonRejectionReasonList } from '../../interfaces/admin/non-rejection-reason/get-all-non-rejection-reason';

export const nonRejectionReasonsResponse: INonRejectionReasonList[] = [
    {
        id: 1,
        nonRejReasonName: 'GS1-NOF',
        nonRejReasonDesc: 'Arises when the scan of a GS1/PLU sticker indicates that the PLU/GS1 is not linked',
        itemTypeInd: 'Produce',
    },
    {
        id: 2,
        nonRejReasonName: 'RPC Required',
        nonRejReasonDesc: 'When item is identified as being packed in RPC but arrives in currogated report to buyer',
        itemTypeInd: 'Produce',
    },
    {
        id: 3,
        nonRejReasonName: 'Temperature',
        nonRejReasonDesc: 'Test for Canadian roses Wk#28-30. Pulp temps of 41-45 degrees will be reported.',
        itemTypeInd: 'Floral',
    },
    {
        id: 4,
        nonRejReasonName: 'No COO on Bill of Lading',
        nonRejReasonDesc: '',
        itemTypeInd: 'Both',
    },
    {
        id: 5,
        nonRejReasonName: 'GS1-NOF1',
        nonRejReasonDesc: 'Arises when the scan of a GS1/PLU sticker indicates that the PLU/GS1 is not linked ',
        itemTypeInd: 'Produce',
    },
    {
        id: 6,
        nonRejReasonName: 'RPC Required1',
        nonRejReasonDesc: 'When item identified as being packed in RPC but arrives in currogated report to buyer',
        itemTypeInd: 'Produce',
    },
    {
        id: 7,
        nonRejReasonName: 'No COO on Bill of Lading1',
        nonRejReasonDesc: '',
        itemTypeInd: 'Both',
    },
    {
        id: 8,
        nonRejReasonName: 'Temperature1',
        nonRejReasonDesc: 'Test for Canadian roses Wk#28-30. Pulp temps of 41-45 degrees will be reported.',
        itemTypeInd: 'Floral',
    },
    {
        id: 9,
        nonRejReasonName: 'GS1-NOF2',
        nonRejReasonDesc: 'Arises when the scan of a GS1/PLU sticker indicates that the PLU/GS1 is not linked',
        itemTypeInd: 'Produce',
    },
    {
        id: 10,
        nonRejReasonName: 'RPC Required2',
        nonRejReasonDesc: 'When item being packed in RPC but arrives in currogated report to buyer',
        itemTypeInd: 'Produce',
    },
    {
        id: 11,
        nonRejReasonName: 'Temperature2',
        nonRejReasonDesc: 'Test for Canadian roses Wk#28-30. Pulp temps of 41-45 degrees will be reported.',
        itemTypeInd: 'Floral',
    },
    {
        id: 12,
        nonRejReasonName: 'No COO on Bill of Lading2',
        nonRejReasonDesc: '',
        itemTypeInd: 'Both',
    },
];
