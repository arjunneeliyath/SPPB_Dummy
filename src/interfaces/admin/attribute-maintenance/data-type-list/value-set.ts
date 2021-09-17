export interface IValueSet {
    dataTypeId?: number;
    seqNbr?: number;
    name: string;
    description: string;
    isModified?: boolean;
    isDeleted?: boolean;
    isNameDuplicate?: boolean;
}
