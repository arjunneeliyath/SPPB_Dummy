import { ReactElement } from 'react';

export interface INonRejectionReasonList {
    id: number;
    nonRejReasonName: string;
    nonRejReasonDesc: string;
    itemTypeInd: string;
    edit?: ReactElement;
    delete?: ReactElement;
}
