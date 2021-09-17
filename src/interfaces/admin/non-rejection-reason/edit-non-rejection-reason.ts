import { INonRejectionReasonAddResponse } from './add-non-rejection-reason';

export interface INonRejectionReasonEditRequest {
    id: number;
    nonRejReasonName?: string;
    nonRejReasonDesc?: string;
    itemTypeInd?: string;
}

export type INonRejectionReasonEditResponse = INonRejectionReasonAddResponse;
