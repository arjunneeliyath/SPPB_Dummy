export interface IAttribute {
    id: number;
    name: string;
    description: string;
    dataType: string;
    dataTypeId: number;
    attrType: string;
    attrRecordType: string[];
    attrWeight: number;
    attrFailureLimit: number;
    itemType: string;
    user: string;
    attrRecTypeForDC: boolean;
    itemMock?: string[];
}
