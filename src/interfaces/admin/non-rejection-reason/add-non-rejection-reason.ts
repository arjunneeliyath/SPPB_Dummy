export interface INonRejectionReasonAddRequest {
    nonRejReasonName: string;
    nonRejReasonDesc: string;
    itemTypeInd: string;
}

export interface INonRejectionReasonAddResponse {
    id: number;
    nonRejReasonName: string;
    nonRejReasonDesc: string;
    itemTypeInd: string;
    message?: string;
}
