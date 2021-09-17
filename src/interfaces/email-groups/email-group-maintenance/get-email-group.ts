import { IEmailAddress } from './email-address';

export interface IGetEmailGroup {
    id: number;
    name: string;
    description: string;
    emailAddresses: IEmailAddress[];
}
