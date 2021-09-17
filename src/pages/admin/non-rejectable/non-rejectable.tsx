import React, { Dispatch, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Modal from '../../../components/modal/modal';
import { connect } from 'react-redux';
import AddNonRejectableReasonForm from './add-non-rejectable-reason';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../components/table/table';
import { INonRejectionReasonList } from '../../../interfaces/admin/non-rejection-reason/get-all-non-rejection-reason';
import { bin, pencil } from '../../../assets/icons';
import { IReduxState } from '../../../modules/store';
import { AnyAction } from 'redux';
import EditNonRejectableReasonForm from './edit-non-rejectable-reason';
import {
    addNonRejectionReason,
    deleteNonRejectionReason,
    editNonRejectionReason,
    getAllNonRejectionList,
} from '../../../modules/admin/non-rejection-reason';
import ConfirmModal from '../../../components/modal/confirm-modal';
import { INonRejectionReasonAddRequest } from '../../../interfaces/admin/non-rejection-reason/add-non-rejection-reason';
import { INonRejectionReasonEditRequest } from '../../../interfaces/admin/non-rejection-reason/edit-non-rejection-reason';
import _ from 'lodash';

interface INonRejectableReasonProps {
    nonRejectableReasonList: INonRejectionReasonList[];
    getNonRejectableReason: () => void;
    deleteNonRejectionReason: (data: number) => void;
    addNonRejectableReason: (data: INonRejectionReasonAddRequest) => void;
    editNonRejectableReason: (data: INonRejectionReasonEditRequest) => void;
}

const titles = [
    { value: 'nonRejReasonName', label: 'Non Rejection Reason', sortValue: 'rr' },
    { value: 'nonRejReasonDesc', label: 'Description', sortValue: 'des' },
    { value: 'itemTypeInd', label: 'ItemType', sortValue: 'it' },
    { value: 'edit', label: '', sortValue: 'edit' },
    { value: 'delete', label: '', sortValue: 'delete', minWidth: 50 },
];
interface ITitles {
    value: string;
    label: string;
    sortValue: string;
    minWidth?: number;
}

const initialValues: INonRejectionReasonList = {
    id: 0,
    nonRejReasonName: '',
    nonRejReasonDesc: '',
    itemTypeInd: '',
};

const Non_Rejectable = (props: INonRejectableReasonProps) => {
    const [addModal, setAddModal] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = React.useState(0);
    const {
        nonRejectableReasonList,
        getNonRejectableReason,
        addNonRejectableReason,
        editNonRejectableReason,
        deleteNonRejectionReason,
    } = props;
    const [nonRejectionData, setNonRejectionData] = React.useState<INonRejectionReasonList>(initialValues);
    const classes = useStyles();

    useEffect(() => {
        getNonRejectableReason();
    }, []);

    const deleteRejectionItem = (rowId: number) => {
        setDeleteModalStatus(true);
        setSelectedRowId(rowId);
    };

    const onEditClick = (row: INonRejectionReasonList) => {
        setEditModal(true);
        setNonRejectionData(row);
    };

    const onSaveClick = (values: INonRejectionReasonAddRequest) => {
        addNonRejectableReason(values);
    };

    const onUpdateClick = (values: INonRejectionReasonEditRequest) => {
        editNonRejectableReason(values);
    };

    const addRows = (rows: INonRejectionReasonList[], titles: ITitles[]) => {
        const tableData = rows?.filter(
            (row, index) => (
                (row.delete = (
                    <img
                        key={`key-${index}`}
                        title="Delete"
                        src={bin}
                        className={classes.iconCell}
                        onClick={() => deleteRejectionItem(row.id)}
                    />
                )),
                (row.edit = (
                    <img
                        key={`key-${index}`}
                        title="Edit"
                        src={pencil}
                        className={classes.iconCell}
                        onClick={() => onEditClick(row)}
                    />
                ))
            )
        );
        return tableData?.map((row) => [
            ...titles.map((title, index) => {
                return (
                    <div
                        key={`${title.value}-${index}`}
                        title={(row as any)[title.value]}
                        className={title.value === 'itemTypeInd' ? classes.textCapitaize : classes.tableCell}
                    >
                        {(row as any)[title.value]}
                    </div>
                );
            }),
        ]);
    };

    const getTitles = (titles: ITitles[]) => [
        ...titles.map((title) => (
            <div key={title.value} style={{ minWidth: title?.minWidth }}>
                {title.label}
            </div>
        )),
    ];
    return (
        <div className={classes.gridContainer}>
            <Grid container>
                <TableComponent
                    addButton={
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setAddModal(true)}
                            className={classes.addButton}
                        >
                            Add A Non Rejectable Reason
                        </Button>
                    }
                    renderBackButton={true}
                    rows={addRows(nonRejectableReasonList, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Add A Non Rejectable Reason"
                    content={<AddNonRejectableReasonForm setModalStatus={setAddModal} onSaveClick={onSaveClick} />}
                    modalStatus={addModal}
                    setModalStatus={setAddModal}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Update A Non Rejectable Reason"
                    content={
                        <EditNonRejectableReasonForm
                            setModalStatus={setEditModal}
                            nonRejectionData={nonRejectionData}
                            onUpdateClick={onUpdateClick}
                        />
                    }
                    modalStatus={editModal}
                    setModalStatus={setEditModal}
                />
                <ConfirmModal
                    title="Confirm"
                    message="Are you sure you want to delete the item?"
                    buttonVariant="text"
                    onSuccess={() => {
                        deleteNonRejectionReason(selectedRowId);
                        setDeleteModalStatus(false);
                    }}
                    onCancel={() => {
                        setDeleteModalStatus(false);
                    }}
                    confirmModalStatus={deleteModalStatus}
                />
            </Grid>
        </div>
    );
};

const mapStateToProps = (state: IReduxState) => ({
    nonRejectableReasonList: _.sortBy(state.nonRejectionReason.nonRejectionReasonDetails, 'id').reverse(),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getNonRejectableReason: () => dispatch(getAllNonRejectionList()),
    deleteNonRejectionReason: (data: number) => dispatch(deleteNonRejectionReason(data)),
    addNonRejectableReason: (data: INonRejectionReasonAddRequest) => dispatch(addNonRejectionReason(data)),
    editNonRejectableReason: (data: INonRejectionReasonEditRequest) => dispatch(editNonRejectionReason(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Non_Rejectable);
