import { IValueSet } from '../data-type-list/value-set';

export interface IDataType {
    id: number;
    name: string;
    desc: string;
    code: string;
    valueSetSW: string;
    valueSetList: IValueSet[];
    valueSetDisp?: string[];
    isModified?: boolean;
}
