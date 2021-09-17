import { IEmailAddress } from './email-address';

export interface ICopyEmailGroup {
    name: string;
    description: string;
    emailAddresses: IEmailAddress[];
}
