export interface IRejectionReasonAddRequest {
    reasonName: string;
    reasonDesc?: string;
    itemTypeInd: string;
}

export interface IRejectionReasonAddResponse {
    id: number;
    reasonName: string;
    reasonDesc: string;
    itemTypeInd: string;
    message?: string;
}
