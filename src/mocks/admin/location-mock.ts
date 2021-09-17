import { ILocationList } from '../../interfaces/admin/location/get-all-location';

export const locationResponse: ILocationList[] = [
    {
        id: 1,
        locationName: 'On Truck',
        locationDesc: 'On Truck Carrier goods',
    },
    {
        id: 2,
        locationName: 'In Warehouse',
        locationDesc: 'In Warehouse',
    },
    {
        id: 3,
        locationName: 'On Hold in Warehouse',
        locationDesc: 'On Hold',
    },
    {
        id: 4,
        locationName: 'Returned to Vendor',
        locationDesc: '',
    },
    {
        id: 5,
        locationName: 'Product and Truck on Hold',
        locationDesc: 'Product is loaded back on the truck. Truck is still at the DC and is waiting disposition',
    },
    {
        id: 6,
        locationName: 'Backhaul on hold',
        locationDesc: 'Product arrived on a backhaul. So it is on the floor but not received',
    },
];
