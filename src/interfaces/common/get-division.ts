export interface IDivisionData {
    id: number;
    name: string;
}

export interface IDivisionsRequest {
    id?: string;
}

export interface IDivisionsResponse {
    divisions: IDivisionData[];
}
