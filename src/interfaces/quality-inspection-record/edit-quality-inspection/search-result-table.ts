export interface imageUrl {
    fileName: string;
    imageUrl: string;
    thumbUrl: string;
}
export interface ISearchResultTable {
    inspResult: string;
    inspType: 'SINGLE' | 'MULTI';
    recordType: string;
    vendorName: string;
    cic: number;
    itemDesc: string;
    recordId: string;
    recordDateTxt: string;
    division: string;
    foreignPoNum: string;
    poNum: string;
    buyerId: string;
    growRegionCode: string;
    userId: string;
    updateTimestamp: string;
    lotNum: string;
    brixAvg: string;
    flav: string;
    size: string;
    color: string;
    app: string;
    cond: string;
    weight: string;
    qual: string;
    overallGrade: string;
    rejReason: string;
    rejQty: number;
    disposition: string;
    images: imageUrl[];
    deleted: boolean;
}
