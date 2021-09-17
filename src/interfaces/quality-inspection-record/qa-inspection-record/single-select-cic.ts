import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ReactElement } from 'react';

export interface IAttribute {
    id: number;
    value: string;
}

export interface ISingleSelectCic {
    label?: ReactElement;
    labelValue?: string;
    [key: string]: any;
    pictures?: ReactElement;
    picList?: File[];
    Rej?: ReactElement;
    RejReasons?: string[];
    RejValue?: string;
    currentLocation?: ReactElement;
    currentLocations?: string[];
    currentLocationValue?: string;
    startTime?: ReactElement;
    startTimeValue?: MaterialUiPickersDate;
    timeZone?: ReactElement;
    timeZoneValue?: string;
    timeZones?: string[];
    recReading?: ReactElement;
    recReadingValue?: string;
    rec?: ReactElement;
    recValue?: string;
    recBrand?: ReactElement;
    recBrandValue?: string;
    recBrands?: string[];
    recFile?: ReactElement;
    recFiles?: File[];
    recFormData?: FormData;
    pulpTemp?: ReactElement;
    pulpTempValue?: string;
}
