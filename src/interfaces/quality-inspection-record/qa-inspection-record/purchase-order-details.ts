export interface IPurchaseOrderDetails {
    id: number;
    poNumber: number;
    division: string;
    facility: string;
    vendor: string;
    growingRegion: string;
    dueDate: string;
    dest: string;
    quantity: string;
    buyer?: string;
    section?: string;
}
