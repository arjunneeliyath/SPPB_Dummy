import { ILocationAddResponse } from './add-location';

export interface ILocationEditRequest {
    id: number;
    locationName: string;
    locationDesc: string;
}

export type ILocationEditResponse = ILocationAddResponse;
