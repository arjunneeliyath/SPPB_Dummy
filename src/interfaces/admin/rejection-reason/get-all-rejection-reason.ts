import { ReactElement } from 'react';

export interface IRejectionReason {
    id: number;
    reasonName: string;
    reasonDesc: string;
    itemTypeInd: string;
    edit?: ReactElement;
    delete?: ReactElement;
}
