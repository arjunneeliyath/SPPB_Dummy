export interface IRejectionReasonGetRequest {
    id: number;
}
export interface IRejectionReasonGetResponse {
    id: number;
    reasonName: string;
    reasonDesc: string;
    itemTypeInd: string;
    message: string;
}
