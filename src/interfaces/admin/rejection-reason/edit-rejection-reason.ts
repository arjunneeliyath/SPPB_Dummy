import { IRejectionReasonAddResponse } from './add-rejection-reason';

export interface IRejectionReasonEditRequest {
    id: number;
    reasonName?: string;
    reasonDesc?: string;
    itemTypeInd?: string;
}

export type IRejectionReasonEditResponse = IRejectionReasonAddResponse;
