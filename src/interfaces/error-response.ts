export interface IErrorResponse {
    errors: IError[];
}

export interface IError {
    code: number;
    message: string;
    fieldErrors: string[];
}
