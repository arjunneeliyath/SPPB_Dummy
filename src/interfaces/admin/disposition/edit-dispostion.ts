import { IDispositionAddResponse } from './add-disposition';

export interface IDispositionEditRequest {
    id: number;
    name: string;
    desc?: string;
}

export type IDispositionEditResponse = IDispositionAddResponse;
