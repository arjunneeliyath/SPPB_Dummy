import { IValueSet } from './value-set';

export interface IEditDataTypeRequest {
    id: number;
    name: string;
    desc: string;
    code?: string;
    valueSetList: IValueSet[];
    valueSetSW: string;
}
