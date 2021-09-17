import { IEditFormFields } from '../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';

export const formFields: IEditFormFields = {
    formFields: {
        basicRejReasons: [
            {
                id: 1,
                name: 'GS1-NOF',
                value: 'aa',
            },
            {
                id: 2,
                name: 'RPC Required',
                value: 'aa',
            },
        ],
        ccList: ['arjun@safeway.com', 'sona@safeway.com', 'liz@safeway.com', 'anjana@safeway.com', 'amoon@safeway.com'],
        currentLocations: [
            {
                id: 1,
                name: 'Location1',
                value: 'aa',
            },
            {
                id: 2,
                name: 'Location2',
                value: 'aa',
            },
        ],
        defectCategories: [
            {
                id: 1,
                name: 'category1',
                value: 'aa',
            },
            {
                id: 2,
                name: 'category2',
                value: 'aa',
            },
            {
                id: 3,
                name: 'category3',
                value: 'aa',
            },
        ],
        defects: [
            {
                id: 1,
                name: 'defect1',
                description: 'description',
                itemTypeInd: 'Produce',
                defectCatId: 1,
            },
            {
                id: 2,
                name: 'defect2',
                description: 'description',
                itemTypeInd: 'Produce',
                defectCatId: 1,
            },
            {
                id: 3,
                name: 'defect3',
                description: 'description',
                itemTypeInd: 'Produce',
                defectCatId: 2,
            },
            {
                id: 4,
                name: 'defect4',
                description: 'description',
                itemTypeInd: 'Produce',
                defectCatId: 2,
            },
            {
                id: 5,
                name: 'defect5',
                description: 'description',
                itemTypeInd: 'Produce',
                defectCatId: 2,
            },
            {
                id: 6,
                name: 'defect6',
                description: 'description',
                itemTypeInd: 'Produce',
                defectCatId: 3,
            },
            {
                id: 7,
                name: 'defect7',
                description: 'description',
                itemTypeInd: 'Produce',
                defectCatId: 3,
            },
        ],
        dynamicAttributes: [
            {
                dataTypeName: 'Text',
                name: 'Lot#',
                id: 1,
                values: [''],
                required: true,
                value: 'aa',
            },
            {
                dataTypeName: 'Text',
                name: 'Brix-Avg',
                id: 2,
                values: [''],
                value: 'aa',
            },
            {
                dataTypeName: 'LevelGrade(10)',
                name: 'Flav',
                id: 3,
                values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                value: 'aa',
            },
            {
                dataTypeName: 'Text',
                name: 'Net.Wt',
                id: 4,
                values: [''],
                value: 'aa',
            },
            {
                dataTypeName: 'Text',
                name: 'Size',
                id: 5,
                values: [''],
                value: 'aa',
            },
            {
                dataTypeName: 'LevelGrade(5)',
                name: 'Color',
                id: 6,
                values: ['1', '2', '3', '4', '5'],
                value: 'aa',
            },
            {
                dataTypeName: 'LevelGrade(5)',
                name: 'App',
                id: 7,
                values: ['1', '2', '3', '4', '5'],
                value: 'aa',
            },
            {
                dataTypeName: 'LevelGrade(5)',
                name: 'Cond',
                id: 8,
                values: ['1', '2', '3', '4', '5'],
                value: 'aa',
            },
            {
                dataTypeName: 'LevelGrade(5)',
                name: 'Wt',
                id: 9,
                values: ['1', '2', '3', '4', '5'],
                value: 'aa',
            },
            {
                dataTypeName: 'LevelGrade(5)',
                name: 'Qual',
                id: 10,
                values: ['1', '2', '3', '4', '5'],
                value: 'aa',
            },
            {
                dataTypeName: 'Text',
                name: 'Overall Grade',
                id: 11,
                values: [''],
                value: 'aa',
            },
        ],
        emailGroups: [
            {
                id: 1,
                name: 'group1',
                value: 'aa',
            },
            {
                id: 2,
                name: 'group2',
                value: 'aa',
            },
            {
                id: 3,
                name: 'group3',
                value: 'aa',
            },
            {
                id: 4,
                name: 'group4',
                value: 'aa',
            },
        ],
        nonRejReasons: [
            {
                id: 1,
                name: 'GS1-NOF',
                value: 'GS1-NOF',
            },
            {
                id: 2,
                name: 'RPC Required',
                value: 'RPC Required',
            },
            {
                id: 3,
                name: 'Temperature',
                value: 'Temperature',
            },
            {
                id: 4,
                name: 'No COO on Bill of Lading',
                value: 'No COO on Bill of Ladin',
            },
            {
                id: 5,
                name: 'KGF-WBC',
                value: 'KGF-WBC',
            },
        ],
        timezones: ['PST', 'AKST', 'AST', 'CST', 'EST', 'MST', 'PST', 'UTC'],
    },
    inspData: {
        emailAddresses: ['arjun.neeliyath@gmail.com', 'sona@safeway.com'],
        emailGroups: [
            {
                id: 1,
                value: 'group1',
            },
            {
                id: 2,
                value: 'group2',
            },
        ],
        growRegionCode: 'Sacramento/Modesto',
        inspRecords: [
            {
                buyerNum: '121',
                cic: 2451,
                dynamicAttributes: [
                    {
                        id: 1,
                        value: '1',
                    },
                    {
                        id: 2,
                        value: '1',
                    },
                    { id: 3, value: '1' },
                    { id: 4, value: '1' },
                    { id: 5, value: '1' },
                    { id: 6, value: '1' },
                    { id: 7, value: '1' },
                    { id: 8, value: '1' },
                    { id: 9, value: '1' },
                    { id: 10, value: '1' },
                ],
                id: 1,
                inspResult: 'FAIL',
                itemDsc: 'Safeway Andronico 4 Pack W/Plastic',
                labelFarm: 'label1',
                locationId: 2,
                nonRejReasonIds: [1],
                packSize: '1.00/4 CT',
                poComments: 'comments',
                pulpTemp: '1',
                qtyOrdered: 70,
                qtyPassed: 0,
                qtyRej: 70,
                qtyShipped: 70,
                recorderBrand: 'None',
                recorderFiles: [
                    { fileName: 'name', fileUrl: 'http://crunchify.com/wp-content/uploads/code/json.sample.txt' },
                ],
                recorderNo: '1',
                recorderReading: '1',
                rejReasonId: 1,
                rejReasons: [
                    {
                        comments: 'comments',
                        defectCatId: 1,
                        defectId: 1,
                        levelAvg: '1',
                        levelHigh: '2',
                        levelLow: '1',
                    },
                ],
                rejTimeAMPM: 'PM',
                rejTimeHH: 5,
                rejTimeMM: 4,
                rejTimeZoneCd: 'AST',
                whseWeight: '10',
            },
            {
                buyerNum: '122',
                cic: 2452,
                dynamicAttributes: [
                    {
                        id: 1,
                        value: '1',
                    },
                    {
                        id: 2,
                        value: '1',
                    },
                ],
                id: 1,
                inspResult: 'PASS',
                itemDsc: 'Safeway Andronico 4 Pack W/Plastic',
                labelFarm: 'label2',
                locationId: 2,
                nonRejReasonIds: [1, 2],
                packSize: '1.00/4 CT',
                pictures: [
                    {
                        fileName: 'Digital.jpg',

                        imageUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=Digital.com',

                        thumbUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=Digital.com',
                    },

                    {
                        fileName: 'Down.jpg',

                        imageUrl: ' https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',

                        thumbUrl: ' https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',
                    },

                    {
                        fileName: 'WebsiteBuilders.jpeg',

                        imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=WebsiteBuilders.com',

                        thumbUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=WebsiteBuilders.com',
                    },
                ],
                poComments: 'comments2',
                pulpTemp: '2',
                qtyOrdered: 90,
                qtyPassed: 90,
                qtyRej: 0,
                qtyShipped: 90,
                recorderBrand: 'None',
                recorderFiles: [
                    { fileName: 'name', fileUrl: 'http://crunchify.com/wp-content/uploads/code/json.sample.txt' },
                ],
                recorderNo: '1',
                recorderReading: '1',
                rejReasonId: 1,
                rejReasons: [
                    {
                        comments: 'comments',
                        defectCatId: 1,
                        defectId: 1,
                        levelAvg: '1',
                        levelHigh: '2',
                        levelLow: '1',
                    },
                ],
                rejTimeAMPM: 'AM',
                rejTimeHH: 8,
                rejTimeMM: 4,
                rejTimeZoneCd: 'AST',
                whseWeight: '10',
            },
            {
                buyerNum: '123',
                cic: 2453,
                dynamicAttributes: [
                    {
                        id: 1,
                        value: '1',
                    },
                    {
                        id: 2,
                        value: '2',
                    },
                ],
                id: 1,
                inspResult: 'PASS_FAIL',
                itemDsc: 'Safeway Andronico 4 Pack W/Plastic',
                labelFarm: 'label3',
                locationId: 2,
                nonRejReasonIds: [1, 2, 3],
                packSize: '1.00/4 CT',
                pictures: [
                    {
                        fileName: 'Digital.jpg',

                        imageUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=Digital.com',

                        thumbUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=Digital.com',
                    },

                    {
                        fileName: 'Down.jpg',

                        imageUrl: ' https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',

                        thumbUrl: ' https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com',
                    },

                    {
                        fileName: 'WebsiteBuilders.jpeg',

                        imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=WebsiteBuilders.com',

                        thumbUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=WebsiteBuilders.com',
                    },
                ],
                poComments: 'dgf',
                pulpTemp: 'ggg',
                qtyOrdered: 90,
                qtyPassed: 80,
                qtyRej: 10,
                qtyShipped: 90,
                recorderBrand: 'None',
                recorderFiles: [
                    { fileName: 'name', fileUrl: 'http://crunchify.com/wp-content/uploads/code/json.sample.txt' },
                ],
                recorderNo: '1',
                recorderReading: '1',
                rejReasonId: 1,
                rejReasons: [
                    {
                        comments: 'comments',
                        defectCatId: 1,
                        defectId: 1,
                        levelAvg: '1',
                        levelHigh: '2',
                        levelLow: '1',
                    },
                ],
                rejTimeAMPM: 'PM',
                rejTimeHH: 10,
                rejTimeMM: 4,
                rejTimeZoneCd: 'AST',
                whseWeight: '10',
            },
        ],
        inspType: 'MULTI',
        inspectionId: 55,
        inspectorComments: 'xjhjx',
        itemTypeTxt: 'PRODUCE',
        poNum: '123',
        recordDateTxt: '08/18/2021',
        selectedCCList: [
            'arjun@safeway.com',
            'sona@safeway.com',
            'liz@safeway.com',
            'anjana@safeway.com',
            'amoon@safeway.com',
        ],
        truckCarrier: 'SAFEWAY BACKHAUL {NO}',
        vendorName: 'Pacific Southwest Container LLC (023616)',
        vendorNo: '4',
        divisionFacility: '25 - NORCAL TRACY WAREHOUSING - 2527',
        buyer: 'L3',
        poComments: 'Approved',
        dueDateTxt: '06/23/2021',
        foreignPoNum: '181411',
    },
};
