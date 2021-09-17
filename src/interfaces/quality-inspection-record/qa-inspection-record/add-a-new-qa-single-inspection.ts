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
    pulpTemp?: string;
    qtyOrdered?: number;
    qtyRej?: number;
    qtyShipped?: number;
    recorderBrand?: string;
    recorderNo?: string;
    recorderReading?: string;
    rejReasonId?: number;
    rejReasons?: IRejReason[];
    rejTimeAMPM?: string;
    rejTimeHH?: number;
    rejTimeMM?: number;
    rejTimeZoneCd?: string;
}

export interface IAddNewQaSingleUpdateRequest {
    inspType: 'SINGLE';
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
    recorderFiles?: File[];
    pictures?: File[];
    itemTypeTxt?: string;
}
