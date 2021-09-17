import { ReactElement } from 'react';
import { IDefect } from './defect';

export interface IGetDefectCategory {
    id: number;
    name: string;
    description: string;
    defects: IDefect[];
    delete?: ReactElement;
}
