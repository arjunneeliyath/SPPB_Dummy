import React from 'react';
import MaterialTable, { Icons } from 'material-table';
import {
    ISearchResultTable,
    imageUrl,
} from '../../../interfaces/quality-inspection-record/edit-quality-inspection/search-result-table';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '../../../components/modal/modal';
import { IMultiInspectionEdit } from '../../../interfaces/quality-inspection-record/qa-inspection-record/form-field-values';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { PatchedPagination } from '../../../utils/pagination';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import ConfirmModal from '../../../components/modal/confirm-modal';
import _ from 'lodash';

interface ISearchResultListProps {
    searchResultList: ISearchResultTable[];
    groupCode: string;
    getMultiInspectionEdit: (data: IMultiInspectionEdit) => void;
    exportRef: React.MutableRefObject<ExcelExport | null>;
    deleteSearchResultRow: (data: number) => void;
    renderMultipleInspectionPage: () => void;
    getRecordId: (id: number) => void;
}

const SearchResultTable = (props: ISearchResultListProps) => {
    const {
        searchResultList,
        groupCode,
        getMultiInspectionEdit,
        exportRef,
        renderMultipleInspectionPage,
        deleteSearchResultRow,
        getRecordId,
    } = props;
    const [viewModal, setViewModal] = React.useState(false);
    const [picsViewer, setPicsViewer] = React.useState<string>('');
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = React.useState(0);

    const openPhotoViewer = (image: any) => {
        setPicsViewer(image);
        setViewModal(true);
    };

    React.useEffect(() => {
        if (searchResultList?.length > 0) {
            let modifiedInspResult: string;
            for (let i = 0; i < searchResultList.length; i++) {
                const newInspResult = _.startCase(_.camelCase(searchResultList[i].inspResult));
                newInspResult === 'Pass Fail'
                    ? (modifiedInspResult = 'Pass/Fail')
                    : newInspResult === 'Pass Overturn'
                    ? (modifiedInspResult = 'Pass(Overturn)')
                    : newInspResult === 'Fail Overturn'
                    ? (modifiedInspResult = 'Fail(Overturn)')
                    : (modifiedInspResult = newInspResult);
                searchResultList[i].inspResult = modifiedInspResult;
            }
        }
    }, [searchResultList]);

    const Sicon = () => (
        <span>
            <SearchIcon titleAccess="Global search" color="primary" style={{ cursor: 'pointer' }} />
        </span>
    );
    const tableIcons: Icons = {
        Search: React.forwardRef((props) => <Sicon {...props} />),
    };

    const deleteData = (id: string) => {
        const rowData = Number(id);
        setDeleteModalStatus(true);
        setSelectedRowId(rowData);
    };

    const editData = (poNumber: string, recordId: string, section: string) => {
        getRecordId(Number(recordId));
        getMultiInspectionEdit({ poNum: poNumber, id: Number(recordId), itemTypeTxt: section });
        renderMultipleInspectionPage();
    };

    const tableColumns = [
        {
            field: '',
            title: 'Edit',
            filtering: false,
            render: (row: ISearchResultTable) => {
                return (
                    <EditIcon
                        color="primary"
                        style={{ cursor: 'pointer' }}
                        titleAccess="View PO details"
                        onClick={() => editData(row.poNum, row.recordId, groupCode)}
                    />
                );
            },
        },
        {
            field: '',
            title: 'Delete',
            filtering: false,
            render: (row: ISearchResultTable) => {
                return row.deleted ? (
                    <></>
                ) : (
                    <DeleteIcon
                        color="primary"
                        style={{ cursor: 'pointer' }}
                        titleAccess="View PO details"
                        onClick={() => deleteData(row.recordId)}
                    />
                );
            },
        },
        {
            field: 'inspResult',
            title: 'Insp Result',
            isExport: true,
        },
        {
            field: 'recordType',
            title: 'Record Type',
            isExport: true,
        },
        {
            field: 'vendorName',
            title: 'Vendor No (Name)',
            isExport: true,
        },
        {
            field: 'cic',
            title: 'Item CIC',
            isExport: true,
        },
        {
            field: 'itemDesc',
            title: 'Item Desc',
            isExport: true,
        },
        {
            field: 'recordDateTxt',
            title: 'Record Date',
            isExport: true,
        },
        {
            field: 'division',
            title: 'Div',
            isExport: true,
        },
        {
            field: 'poNum',
            title: 'PO#',
            isExport: true,
        },
        {
            field: 'buyerId',
            title: 'Buyer ID',
            isExport: true,
        },
        {
            field: 'growRegionCode',
            title: 'Grow Region',
            isExport: true,
        },
        {
            field: 'userId',
            title: 'User ID',
            isExport: true,
        },
        {
            field: 'updateTimestamp',
            title: 'Update Timestamp',
            isExport: true,
        },
        {
            field: 'lotNum',
            title: 'Lot#',
            isExport: true,
        },
        {
            field: 'brixAvg',
            title: 'Brix-Avg',
            isExport: true,
        },
        {
            field: 'flav',
            title: 'Flavour',
            isExport: true,
        },
        {
            field: 'size',
            title: 'Size',
            isExport: true,
        },
        {
            field: 'color',
            title: 'Color',
            isExport: true,
        },
        {
            field: 'app',
            title: 'App',
            isExport: true,
        },
        {
            field: 'cond',
            title: 'Cond',
            isExport: true,
        },
        {
            field: 'weight',
            title: 'Wt',
            isExport: true,
        },
        {
            field: 'qual',
            title: 'Qual',
            isExport: true,
        },
        {
            field: 'overallGrade',
            title: 'Overall Grade',
            isExport: true,
        },
        {
            field: 'rejReason',
            title: 'Rej Reason',
            isExport: true,
        },
        {
            field: 'rejQty',
            title: 'Rej Quantity',
            isExport: true,
        },
        {
            field: 'disposition',
            title: 'Disposition',
            isExport: true,
        },
        {
            field: 'images',
            title: 'Images',
            width: '13%',
            cellStyle: { width: '13%' },
            headerStyle: { width: '13%' },
            render: (rowData: { images: imageUrl[] }) => (
                <ImageList rowHeight="auto" cols={4}>
                    {rowData.images.map((img: imageUrl, index) => (
                        <ImageListItem key={index}>
                            <img
                                key={`img-${index}`}
                                src={img?.thumbUrl}
                                style={{ width: 40, height: 15 }}
                                onClick={() => openPhotoViewer(img?.imageUrl)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ),
        },
    ];

    const title = <h3 style={{ color: '#00529F' }}>Search results</h3>;
    return (
        <div>
            <ExcelExport data={searchResultList} ref={exportRef}>
                {tableColumns.map(
                    (column, index) =>
                        column.isExport && (
                            <ExcelExportColumn key={`column-${index}`} field={column.field} title={column.field} />
                        )
                )}
            </ExcelExport>
            <MaterialTable
                icons={tableIcons}
                columns={tableColumns}
                data={searchResultList}
                title={title}
                options={{
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    tableLayout: 'auto',
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
            {viewModal ? (
                <Modal
                    maxWidth={'sm'}
                    title="View Pictures"
                    content={<img src={picsViewer} />}
                    modalStatus={viewModal}
                    setModalStatus={setViewModal}
                />
            ) : (
                <></>
            )}
            <ConfirmModal
                title="Confirm"
                message="Are you sure you want to delete the item?"
                buttonVariant="text"
                onSuccess={() => {
                    deleteSearchResultRow(selectedRowId);
                    setDeleteModalStatus(false);
                }}
                onCancel={() => {
                    setDeleteModalStatus(false);
                }}
                confirmModalStatus={deleteModalStatus}
            />
        </div>
    );
};

export default SearchResultTable;
