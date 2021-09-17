export interface IEmailAddress {
    id?: number;
    name: string;
    emailAddress: string;
    doValidate?: boolean;
    doRemove?: boolean;
    isModified?: boolean;
    isSafewayMail?: boolean;
    isValidMail?: boolean;
    isMailDuplicate?: boolean;
    isNameDuplicate?: boolean;
}
