import { IDispositionList } from '../../interfaces/admin/disposition/get-all-disposition';

export const dispositionResponse: IDispositionList[] = [
    {
        id: 1,
        name: 'Code 0 Rejection/Lumper Claim',
        desc: 'Rejection/Vendor Claim',
    },
    {
        id: 2,
        name: 'Code 1 Rejection/Vendor Claim',
        desc: 'Rejection/Vendor Claim',
    },
    {
        id: 3,
        name: 'Code 2 Rejection: Vendor DLVD',
        desc: 'Rejection/ Carrier Claim. Vendor secured carrier',
    },
    {
        id: 4,
        name: 'Code 3: Rejection/Vendor Donation',
        desc: 'Rejection / Vendor secured carrier',
    },
    {
        id: 5,
        name: 'Code 4 Rej/DLVD/Rtn.ToVendor/no frt.Chge',
        desc: 'Rejection/DLVD/Return to vendor/no frt. Charge',
    },
    {
        id: 6,
        name: 'Code 5 Rej/Failed Federal/Vendor claim',
        desc: 'Rejection/Failed Federal/Vendor claim',
    },
    {
        id: 7,
        name: 'Code 6Srt shpt/Vendor Claim/bill for frt',
        desc: 'Short shipment/Vendor Claim/ bill for frt variance',
    },
    {
        id: 8,
        name: 'Code 7 Dump/Donate (combined <$50)',
        desc: 'Dump/Donate Cost of product and freight less than $50',
    },
    {
        id: 9,
        name: 'Code 8 Rej: Dump/Donate whse-',
        desc: 'Dump/Donate whse-',
    },
    {
        id: 10,
        name: 'Code 9 Shipper request Inspection',
        desc: 'Shipper requesting USDA or CFIA Inspection',
    },
    {
        id: 11,
        name: 'Code 10 Consolidater Claim',
        desc: 'Rejection due to consolidater loading error',
    },
];
