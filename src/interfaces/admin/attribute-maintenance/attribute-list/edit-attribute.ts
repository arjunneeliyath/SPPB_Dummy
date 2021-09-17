export interface IAttributeMaintenanceEditRequest {
    id: number;
    name: string;
    description: string;
    dataType: string;
    dataTypeId: number;
    attrType: string;
    attrRecordType: string[];
    itemType: string;
    attrRecTypeForDC: boolean;
    attrWeight: number;
    attrFailureLimit: number;
    itemMock?: string[];
    user?: string;
}

export interface IAttributeMaintenanceEditResponse {
    id: number;
    name: string;
    description: string;
    dataType: string;
    dataTypeId: number;
    attrType: string;
    attrRecordType: string[];
    itemType: string;
    attrRecTypeForDC: boolean;
    attrWeight: number;
    attrFailureLimit: number;
    itemMock?: string[];
    user?: string;
}
