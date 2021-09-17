export interface ILocationAddRequest {
    locationName: string;
    locationDesc: string;
}

export interface ILocationAddResponse {
    id: number;
    locationName: string;
    locationDesc: string;
    message?: string;
}
