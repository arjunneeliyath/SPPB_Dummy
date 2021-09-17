import AttributeMaintenance from '../../assets/icons/Attribute Maintenance.svg';
import ReasonList from '../../assets/icons/Reason List.svg';
import RejectionReasonList from '../../assets/icons/Rejection Reason List.svg';
import rejected from '../../assets/icons/Defect.svg';
import DispositionList from '../../assets/icons/Disposition List.svg';
import LocationList from '../../assets/icons/Location List.svg';
import RefreshAllCaches from '../../assets/icons/Refresh All Caches.svg';
import Synchronise from '../../assets/icons/Synchronise.svg';

export const admins = [
    {
        name: 'Attribute Maintenance',
        imageurl: AttributeMaintenance,
        url: '/Admin/Attribute Maintenance',
    },
    {
        name: 'Non Rejectable Reason List',
        imageurl: ReasonList,
        url: '/Admin/Non Rejection Reason List',
    },
    {
        name: 'Rejection Reason List',
        imageurl: RejectionReasonList,
        url: '/Admin/Rejection Reason List',
    },
    {
        name: 'Defect Category List',
        imageurl: rejected,
        url: '/Admin/Defect Category List',
    },
    {
        name: 'Disposition List',
        imageurl: DispositionList,
        url: '/Admin/Disposition List',
    },
    {
        name: 'Location List',
        imageurl: LocationList,
        url: '/Admin/Location List',
    },
];

export const subitems = [
    {
        name: 'Refresh All Caches',
        imageurl: RefreshAllCaches,
        url: '/home',
    },
    {
        name: 'Synchronise Vendor Items with SSIMS Table',
        imageurl: Synchronise,
        url: '/home',
    },
];
