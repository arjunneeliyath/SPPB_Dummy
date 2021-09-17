export interface IEditFormFields {
    formFields: IFormFieldValues;
    inspData: IInspectionValues;
}

export interface IFormFieldValues {
    basicRejReasons: IParameterValues[];
    ccList: string[];
    currentLocations: IParameterValues[];
    defectCategories: IParameterValues[];
    defects: IDefect[];
    dynamicAttributes: IDynamicAttribute[];
    emailGroups: IParameterValues[];
    nonRejReasons: IParameterValues[];
    timezones: string[];
}
export interface IParameterValues {
    id?: number;
    name: string;
    value: string;
    isSelected?: boolean;
}

export interface IDefect {
    defectCatId?: number;
    description: string;
    id?: number;
    itemTypeInd: string;
    name: string;
}

export interface IDynamicAttribute {
    dataTypeName: string;
    id: number;
    name: string;
    required?: boolean;
    value: string;
    values: string[];
}

export interface IInspectionValues {
    emailAddresses: string[];
    emailGroups: IDynamicValues[];
    growRegionCode: string;
    inspRecords: IInspRecord[];
    inspType: 'MULTI';
    inspectionId: number;
    inspectorComments: string;
    itemTypeTxt?: string;
    poNum: string;
    recordDateTxt: string;
    selectedCCList: string[];
    truckCarrier: string;
    vendorName: string;
    vendorNo?: string;
    foreignPoNum?: string;
    poComments?: string;
    dueDateTxt?: string;
    divisionFacility?: string;
    buyer?: string;
}

export interface IDynamicValues {
    id: number;
    value: string;
    isSelected?: boolean;
}

export interface IInspRecord {
    buyerNum: string;
    cic?: number;
    dynamicAttributes?: IDynamicValues[];
    id: number;
    inspResult: 'FAIL' | 'PASS' | 'PASS_FAIL' | 'PASS_OVERTURN' | 'FAIL_OVERTURN';
    itemDsc?: string;
    labelFarm?: string;
    locationId?: number;
    nonRejReasonIds: number[];
    packSize?: string;
    pictures?: IPictures[];
    poComments: string;
    pulpTemp?: string;
    qtyOrdered: number;
    qtyPassed?: number;
    qtyRej?: number;
    qtyShipped?: number;
    recorderBrand?: string;
    recorderFiles?: IRecordFiles[];
    recorderNo?: string;
    recorderReading?: string;
    rejReasonId?: number;
    rejReasons?: IRejReason[];
    rejTimeAMPM?: string;
    rejTimeHH?: number;
    rejTimeMM?: number;
    rejTimeZoneCd?: string;
    whseWeight?: string;
}
export interface IRejReason {
    comments: string;
    defectCatId: number;
    defectId: number;
    levelAvg: string;
    levelHigh: string;
    levelLow: string;
}

export interface IPictures {
    fileName: string;
    imageUrl: string;
    thumbUrl: string;
}

export interface IRecordFiles {
    fileName: string;
    fileUrl: string;
}
