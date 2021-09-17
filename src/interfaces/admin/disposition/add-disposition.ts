export interface IDispositionAddRequest {
    name: string;
    desc?: string;
}

export interface IDispositionAddResponse {
    id: number;
    name: string;
    desc: string;
    message?: string;
}
