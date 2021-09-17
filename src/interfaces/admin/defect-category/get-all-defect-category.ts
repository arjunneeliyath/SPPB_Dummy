import { ReactElement } from 'react';

export interface IDefectList {
    id: number;
    name: string;
    description: string;
    edit?: ReactElement;
    delete?: ReactElement;
}
