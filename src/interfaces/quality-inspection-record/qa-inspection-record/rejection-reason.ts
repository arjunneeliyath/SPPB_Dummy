import { IDefect } from '../../admin/defect-category/defect';
import { IParameterValues } from './parameter-values';
export interface IRejectionReason {
    category: string;
    defect: string;
    avg: string;
    low: string;
    high: string;
    comments: string;
    defectList?: IDefect[];
    categoryList?: IParameterValues[];
}
