import { ICorpItemCode } from './corp-item-code';

export interface IEditPurchaseOrder {
    id?: number;
    foreignPO: number;
    divisionFacility?: string;
    recordDate?: string;
    buyer?: string;
    growingRegion: string;
    vendor: string;
    vendorNum: string;
    poComments?: string;
    dueDate?: string;
    cicList?: ICorpItemCode[];
    truckCarrier?: string;
    whseWeight?: string;
}
