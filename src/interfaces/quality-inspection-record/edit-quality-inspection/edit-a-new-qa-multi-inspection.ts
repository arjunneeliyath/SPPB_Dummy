export interface IDynamicValues {
    id: number;
    value: string;
}
export interface IRejReason {
    comments: string;
    defectCatId: number;
    defectId: number;
    levelAvg: string;
    levelHigh: string;
    levelLow: string;
}
export interface IEditInspRecord {
    cic?: number;
    dynamicAttributes?: IDynamicValues[];
    id?: number;
    inspResult: 'FAIL' | 'PASS' | 'PASS_FAIL' | 'PASS_OVERTURN' | 'FAIL_OVERTURN';
    labelFarm?: string;
    locationId?: number;
    nonRejReasonIds?: number[];
    pictures?: File[];
    delRecImgNames?: string[];
    pulpTemp?: string;
    qtyOrdered?: number;
    qtyPassed?: number;
    qtyRej?: number;
    qtyShipped?: number;
    recorderBrand?: string;
    recorderFiles?: File[];
    delRecFileNames?: string[];
    recorderNo?: string;
    recorderReading?: string;
    rejReasonId?: number;
    rejectionId?: number;
    rejReasons: IRejReason[];
    rejTimeAMPM?: string;
    rejTimeHH?: number;
    rejTimeMM?: number;
    rejTimeZoneCd?: string;
    whseWeight?: string;
}

export interface IEditQaMultiUpdateRequest {
    inspType: 'MULTI';
    emailAddresses: string[];
    inspRecords: IEditInspRecord[];
    inspectorComments: string;
    recordDateTxt: string;
    selectedCCList: string[];
    truckCarrier: string;
    itemTypeTxt: string;
    growRegionCode: string;
    poNum: string;
    vendorName: string;
    vendorNo: string;
}
