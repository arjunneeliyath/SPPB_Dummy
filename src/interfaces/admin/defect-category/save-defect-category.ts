import { IDefect } from './defect';

export interface ISaveDefectCategoryRequest {
    name: string;
    description: string;
    defects: IDefect[];
}
