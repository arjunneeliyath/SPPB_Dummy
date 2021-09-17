import { IDefect } from './defect';

export interface IUpdateDefectCategoryRequest {
    id: number;
    name: string;
    description: string;
    defects: IDefect[];
}
