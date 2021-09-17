import { ReactElement } from 'react';

export interface ILocationList {
    id: number;
    locationName: string;
    locationDesc: string;
    edit?: ReactElement;
    delete?: ReactElement;
}
