import { IEmailAddress } from './email-address';

export interface ISaveEmailGroup {
    id?: number;
    name: string;
    description: string;
    emailAddresses: IEmailAddress[];
}
