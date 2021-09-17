export interface INonRejectionReasonGetRequest {
    id: number;
}
export interface INonRejectionReasonGetResponse {
    id: number;
    reasonName: string;
    reasonDesc: string;
    itemTypeInd: string;
    message: string;
}
