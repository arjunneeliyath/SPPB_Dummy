import { IValueSet } from './value-set';

export interface ISaveDataTypeRequest {
    name: string;
    desc: string;
    code?: string;
    valueSetList: IValueSet[];
    valueSetSW: string;
}
