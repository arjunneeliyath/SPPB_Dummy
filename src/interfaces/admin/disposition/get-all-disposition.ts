import { ReactElement } from 'react';

export interface IDispositionList {
    id: number;
    name: string;
    desc: string;
    edit?: ReactElement;
    delete?: ReactElement;
}
