import { IDataType } from '../../../interfaces/admin/attribute-maintenance/attribute-list/get-datatype';

export const dataTypeResponse: IDataType[] = [
    {
        id: 1,
        name: 'Text',
        desc: 'Type for string of characters',
        code: 'System Defined Item Attribute',
        valueSetSW: 'YES',
        valueSetList: [],
    },
    {
        id: 2,
        name: 'Decimal',
        desc: 'Decimal datatype',
        code: 'System Defined Item Attribute',
        valueSetSW: 'YES',
        valueSetList: [],
    },
    {
        id: 3,
        name: 'Date',
        desc: 'Type for date',
        code: 'System Defined Item Attribute',
        valueSetSW: 'YES',
        valueSetList: [],
    },
    {
        id: 4,
        name: 'Boolean',
        desc: 'Primitive boolean type for true and false',
        code: 'System Defined Item Attribute',
        valueSetSW: 'YES',
        valueSetList: [
            {
                dataTypeId: 2,
                seqNbr: 1,
                name: 'True',
                description: 'description-1',
            },
            {
                dataTypeId: 4,
                seqNbr: 1,
                name: 'False',
                description: 'description-1',
            },
        ],
    },
    {
        id: 5,
        name: 'LevelGrade(5)',
        desc: 'Enumeration type with name 1-5 with increasing quality',
        code: 'System Defined Item Attribute',
        valueSetSW: 'YES',
        valueSetList: [
            {
                dataTypeId: 5,
                seqNbr: 1,
                name: 'name-7',
                description: 'description-1',
            },
            {
                dataTypeId: 5,
                seqNbr: 2,
                name: 'name-8',
                description: 'description-3',
            },
        ],
    },
    {
        id: 6,
        name: 'LevelGrade(10)',
        desc: 'Enumeration type with name 1-10 with increasing quality',
        code: 'System Defined Item Attribute',
        valueSetSW: 'YES',
        valueSetList: [],
    },
];
