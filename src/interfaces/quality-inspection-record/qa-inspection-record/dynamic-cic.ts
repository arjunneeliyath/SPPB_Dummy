import { ReactElement } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IRejectionReason } from './rejection-reason';

export interface IErrorDisplay {
    itemIndex?: number;
    rowIndex: number;
    columnName: string;
    errorMsg: string;
}

export interface IDynamicCic {
    id: number;
    rowIndex?: number;
    corpItemCode: number;
    itemDesc: string;
    packSize: string;
    results?: ReactElement;
    resultsValue?: string;
    resultsId?: string;
    qtyOrderd: number;
    shippedQty?: ReactElement;
    shippedQtyValue?: string;
    passedQty?: ReactElement;
    passedQtyValue?: string;
    rejectedQty?: ReactElement;
    rejectedQtyValue?: string;
    label?: ReactElement;
    labelValue?: string;
    [key: string]: any;
    overallGrade?: ReactElement;
    overallGradeValue?: string;
    pressureTest?: ReactElement;
    pressureTestValue?: string;
    pictures?: ReactElement;
    picList?: File[];
    nonRej?: ReactElement;
    nonRejValue?: string[];
    nonRejIds?: number[];
    isSelected?: boolean;
    color?: any;
    startTimeValue?: MaterialUiPickersDate;
    currentLocationValue?: number;
    recFiles?: File[];
    recBrandValue?: string;
    recValue?: string;
    recReadingValue?: string;
    pulpTempValue?: string;
    timeZoneValue?: string;
    basicRejReasonValue?: string;
    qtySampValue?: string;
    sampSizeValue?: string;
    rejectionReasons?: IRejectionReason[];
}
