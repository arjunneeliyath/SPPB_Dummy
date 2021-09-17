import { IDynamicAttribute } from '../../admin/attribute-maintenance/attribute-list/dynamic-attribute';
import { IDefect } from '../../admin/defect-category/defect';
import { IParameterValues } from './parameter-values';

export interface IDoneWithSelection {
    basicRejReasons: IParameterValues[];
    ccList: string[];
    currentLocations: IParameterValues[];
    dynamicAttributes: IDynamicAttribute[];
    nonRejReasons: IParameterValues[];
    timezones: string[];
    emailGroups: IParameterValues[];
    defectCategories: IParameterValues[];
    defects: IDefect[];
}
