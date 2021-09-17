export interface ICcListMailMaintenance {
    id?: number;
    emailAddress: string;
    doValidate?: boolean;
    doRemove?: boolean;
    isModified?: boolean;
    isSafewayMail?: boolean;
    isValidMail?: boolean;
    isMailDuplicate?: boolean;
    duplicateOf?: number;
    isSelected?: boolean;
}
