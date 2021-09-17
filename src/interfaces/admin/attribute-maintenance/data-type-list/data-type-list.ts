import { ReactElement } from 'react';
import { IValueSet } from './value-set';

export interface IDataTypeList {
    id: number;
    name: string;
    desc: string;
    code: string;
    valueSetSW: string;
    valueSetList: IValueSet[];
    valueSetDisp?: string[];
    edit?: ReactElement;
    delete?: ReactElement;
}
