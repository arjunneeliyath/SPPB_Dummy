export interface IDefect {
    id?: number;
    name: string;
    description: string;
    itemTypeInd: string;
    defectCatId?: number;
    isModified?: boolean;
    isNameDuplicate?: boolean;
}
