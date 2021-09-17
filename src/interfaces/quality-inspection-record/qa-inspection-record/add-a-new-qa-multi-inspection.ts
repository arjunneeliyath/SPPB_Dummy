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
export interface IInspRecord {
    cic?: number;
    dynamicAttributes?: IDynamicValues[];
    whseWeight?: string;
    itemDsc?: string;
    labelFarm?: string;
    locationId?: number;
    packSize?: string;
    pictures?: File[];
    pulpTemp?: string;
    qtyOrdered?: number;
    qtyRej?: number;
    qtyPassed?: number;
    qtyShipped?: number;
    rejReasonId?: number;
    recorderBrand?: string;
    recorderFiles?: File[];
    recorderNo?: string;
    recorderReading?: string;
    nonRejReasonIds: number[];
    rejReasons?: IRejReason[];
    rejTimeAMPM?: string;
    rejTimeHH?: number;
    rejTimeMM?: number;
    rejTimeZoneCd?: string;
    inspResult: 'PASS' | 'FAIL' | 'PASS_FAIL';
}

export interface IQaMultiUpdateRequest {
    inspType: 'MULTI';
    emailAddresses: string[];
    emailGroupIds: number[];
    growRegionCode: string;
    inspRecords: IInspRecord[];
    inspectorComments: string;
    poNum: string;
    recordDateTxt: string;
    selectedCCList: string[];
    truckCarrier: string;
    vendorName: string;
    vendorNo?: string;
    itemTypeTxt?: string;
}
