import React from 'react';
import { Grid } from '@material-ui/core';
import MaterialTable, { Icons } from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { IPurchaseOrderDetails } from '../../../interfaces/quality-inspection-record/qa-inspection-record/purchase-order-details';
import _ from 'lodash';
import { PatchedPagination } from '../../../utils/pagination';
import { IQaInspectionFormValues } from '../../../interfaces/quality-inspection-record/qa-inspection-record/qa-inspection-form-values';
import { setFormattedDate } from '../../../utils/date-formater';

interface IPurchaseOrderListProps {
    purchaseOrderList: IPurchaseOrderDetails[];
    viewData: (po: string, sectionId: string) => void;
    fromHomePage?: boolean;
    inspectionFormValues?: IQaInspectionFormValues;
}

export const PurchaseOrderList = (props: IPurchaseOrderListProps) => {
    const { purchaseOrderList, viewData, fromHomePage, inspectionFormValues } = props;
    const Sicon = () => (
        <span>
            <SearchIcon titleAccess="Global search" color="primary" style={{ cursor: 'pointer' }} />
        </span>
    );
    const Ficon = () => (
        <span>
            <FilterListIcon
                titleAccess="Type something to filter the data"
                color="primary"
                style={{ cursor: 'pointer' }}
            />
        </span>
    );
    const tableIcons: Icons = {
        Search: React.forwardRef((props) => <Sicon {...props} />),
        Filter: React.forwardRef((props) => <Ficon {...props} />),
    };
    const columns = [
        {
            field: 'poNumber',
            title: 'Foreign PO#',
        },
        { field: 'division', title: 'Division' },
        {
            field: 'facility',
            title: 'Facility',
            cellStyle: {
                width: '30%',
                maxWidth: '30%',
            },
            headerStyle: {
                width: '30%',
                maxWidth: '30%',
            },
        },
        {
            field: 'vendor',
            title: 'Vendor',
            cellStyle: {
                width: '25%',
                maxWidth: '25%',
            },
            headerStyle: {
                width: '25%',
                maxWidth: '25%',
            },
        },
        { field: 'growingRegion', title: 'Growing Region' },
        { field: 'dueDate', title: 'Due Date' },
        { field: 'dest', title: 'Dest' },
        { field: 'quantity', title: 'Qty' },
        {
            field: 'view',
            title: '',
            filtering: false,
            render: (row: IPurchaseOrderDetails) => {
                const sectionId = row.section === 'P' ? '1' : '2';
                return (
                    <VisibilityIcon
                        color="primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => viewData(row.poNumber.toString(), sectionId)}
                        titleAccess="View PO details"
                    />
                );
            },
        },
    ];

    const sortedData = _.sortBy(purchaseOrderList, 'poNumber');
    const title = (
        <h3 style={{ color: '#00529F' }}>
            {fromHomePage
                ? 'List of POs for Today'
                : `List of POs from ${setFormattedDate(
                      new Date(inspectionFormValues?.fromDate || '')
                  )} to ${setFormattedDate(new Date(inspectionFormValues?.toDate || ''))}`}
        </h3>
    );
    return (
        <Grid container>
            <MaterialTable
                title={title}
                icons={tableIcons}
                data={sortedData}
                columns={columns}
                options={{
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    filtering: true,
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                        color: '#2C2A29',
                        fontWeight: 'bold',
                    },
                    padding: 'dense',
                }}
                components={{
                    Pagination: PatchedPagination,
                }}
                style={{ backgroundColor: '#FFFFFF' }}
            />
        </Grid>
    );
};

export default PurchaseOrderList;
