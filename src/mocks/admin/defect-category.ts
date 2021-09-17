import { IDefectList } from '../../interfaces/admin/defect-category/get-all-defect-category';
import { IGetDefectCategory } from '../../interfaces/admin/defect-category/get-defect-category';

export const defectCategoryResponse: IDefectList[] = [
    {
        id: 1,
        name: 'Produce defect category',
        description: '',
    },
    {
        id: 2,
        name: 'A. Serious Defect',
        description: 'Defects Warrenting Rejection',
    },
    {
        id: 3,
        name: 'B. Receiving Temperature',
        description:
            'Receiving temperature as measured by pulp temperature and review of temperature monitoring device(TMD) records',
    },
    {
        id: 4,
        name: 'C. Item/Label/Pack Discrepancy',
        description: 'Do Not Use This Category',
    },
    {
        id: 5,
        name: 'l',
        description: 'Do Not Use This Category',
    },
    {
        id: 6,
        name: 'l',
        description: 'Do Not Use This Category',
    },
    {
        id: 7,
        name: 'Primary Floral Defect',
        description: 'Do Not Use This Category',
    },
    {
        id: 8,
        name: 'Primary Produce Defect',
        description: 'Do Not Use This Category',
    },
];

export const defectCategoryDetails: IGetDefectCategory = {
    id: 1,
    name: 'Category1',
    description: 'description description description',
    defects: [
        {
            id: 1,
            name: 'defect11',
            description: 'description1 description1',
            itemTypeInd: 'unassigned',
        },
        {
            id: 2,
            name: 'defect12',
            description: 'description2 description2',
            itemTypeInd: 'unassigned',
        },
        {
            id: 3,
            name: 'defect13',
            description: 'description3 description3',
            itemTypeInd: 'unassigned',
        },
    ],
};

export const defectCategoryArray: IGetDefectCategory[] = [
    {
        id: 1,
        name: 'Category1',
        description: 'description description description',
        defects: [
            {
                id: 1,
                name: 'defect11',
                description: 'description1 description1',
                itemTypeInd: 'unassigned',
            },
            {
                id: 2,
                name: 'defect12',
                description: 'description2 description2',
                itemTypeInd: 'unassigned',
            },
            {
                id: 3,
                name: 'defect13',
                description: 'description3 description3',
                itemTypeInd: 'unassigned',
            },
        ],
    },
    {
        id: 2,
        name: 'Category2',
        description: 'description description description',
        defects: [
            {
                id: 1,
                name: 'defect21',
                description: 'description1 description1',
                itemTypeInd: 'unassigned',
            },
            {
                id: 2,
                name: 'defect22',
                description: 'description2 description2',
                itemTypeInd: 'unassigned',
            },
            {
                id: 3,
                name: 'defect23',
                description: 'description3 description3',
                itemTypeInd: 'unassigned',
            },
        ],
    },
    {
        id: 3,
        name: 'Category3',
        description: 'description description description',
        defects: [
            {
                id: 1,
                name: 'defect31',
                description: 'description1 description1',
                itemTypeInd: 'unassigned',
            },
            {
                id: 2,
                name: 'defect32',
                description: 'description2 description2',
                itemTypeInd: 'unassigned',
            },
            {
                id: 3,
                name: 'defect33',
                description: 'description3 description3',
                itemTypeInd: 'unassigned',
            },
        ],
    },
];
