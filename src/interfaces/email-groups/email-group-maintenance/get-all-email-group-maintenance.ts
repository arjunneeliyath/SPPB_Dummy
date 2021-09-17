import { ReactElement } from 'react';

export interface IEmailGroupMaintenance {
    id: number;
    name: string;
    description: string;
    edit?: ReactElement;
    delete?: ReactElement;
    isSelected?: boolean;
}
