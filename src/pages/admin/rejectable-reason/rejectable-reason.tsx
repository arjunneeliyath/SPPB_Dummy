import React, { useEffect } from 'react';
import { IReduxState } from '../../../modules/store';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import TableComponent from '../../../components/table/table';
import { Grid, Button } from '@material-ui/core';
import { useStyles } from './styles';
import { IRejectionReason } from '../../../interfaces/admin/rejection-reason/get-all-rejection-reason';
import {
    addRejectionReason,
    deleteRejectionReason,
    editRejectionReason,
    getAllRejectionList,
} from '../../../modules/admin/rejection-reason';
import { bin, pencil } from '../../../assets/icons/index';
import AddRejectableReasonForm from './add-rejectable-reason';
import EditRejectableReasonForm from './edit-rejectable-reason';
import Modal from '../../../components/modal/modal';
import ConfirmModal from '../../../components/modal/confirm-modal';
import { IRejectionReasonAddRequest } from '../../../interfaces/admin/rejection-reason/add-rejection-reason';
import { IRejectionReasonEditRequest } from '../../../interfaces/admin/rejection-reason/edit-rejection-reason';
import _ from 'lodash';

interface IRejectableReasonProps {
    rejectableReasonList: IRejectionReason[];
    getRejectableReason: () => void;
    deleteRejectionReason: (data: number) => void;
    addRejectableReason: (data: IRejectionReasonAddRequest) => void;
    editRejectableReason: (data: IRejectionReasonEditRequest) => void;
}

const titles = [
    { value: 'reasonName', label: 'Rejection Reason', sortValue: 'rr' },
    { value: 'reasonDesc', label: 'Description', sortValue: 'des' },
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

const RejectableReason = (props: IRejectableReasonProps) => {
    const initialValues: IRejectionReason = { id: 0, reasonName: '', itemTypeInd: '', reasonDesc: '' };
    const classes = useStyles();
    const {
        rejectableReasonList,
        getRejectableReason,
        deleteRejectionReason,
        addRejectableReason,
        editRejectableReason,
    } = props;
    const [addModal, setAddModal] = React.useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const [editModalStatus, setEditModalStatus] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = React.useState(0);
    const [rejectionData, setRejectionData] = React.useState<IRejectionReason>(initialValues);

    useEffect(() => {
        getRejectableReason();
    }, []);

    const deleteRejectionItem = (rowId: number) => {
        setDeleteModalStatus(true);
        setSelectedRowId(rowId);
    };

    const editRejectionItem = (row: IRejectionReason) => {
        setEditModalStatus(true);
        setRejectionData(row);
    };

    const onSaveClick = (values: IRejectionReasonAddRequest) => {
        addRejectableReason(values);
    };

    const onUpdateClick = (values: IRejectionReasonEditRequest) => {
        editRejectableReason(values);
    };

    const addRows = (rows: IRejectionReason[], titles: ITitles[]) => {
        const tableData = rows.filter(
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
                        onClick={() => editRejectionItem(row)}
                    />
                ))
            )
        );
        return tableData?.map((row) => [
            ...titles.map((title, index) => (
                <div
                    key={`${title.value}-${index}`}
                    title={(row as any)[title.value]}
                    className={title.value === 'itemTypeInd' ? classes.textCapitaize : classes.tableCell}
                >
                    {(row as any)[title.value]}
                </div>
            )),
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
                            Add A Rejectable Reason
                        </Button>
                    }
                    renderBackButton={true}
                    rows={addRows(rejectableReasonList, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Add A Rejectable Reason"
                    content={<AddRejectableReasonForm setModalStatus={setAddModal} onSaveClick={onSaveClick} />}
                    modalStatus={addModal}
                    setModalStatus={setAddModal}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Update A Rejectable Reason"
                    content={
                        <EditRejectableReasonForm
                            setModalStatus={setEditModalStatus}
                            rejectionData={rejectionData}
                            onUpdateClick={onUpdateClick}
                        />
                    }
                    modalStatus={editModalStatus}
                    setModalStatus={setEditModalStatus}
                />
            </Grid>
            <ConfirmModal
                title="Confirm"
                message="Are you sure you want to delete the item?"
                buttonVariant="text"
                onSuccess={() => {
                    deleteRejectionReason(selectedRowId);
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

const mapStateToProps = (state: IReduxState) => ({
    rejectableReasonList: _.sortBy(state.rejectableReason.rejectionReasonDetails, 'id').reverse(),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getRejectableReason: () => dispatch(getAllRejectionList()),
    deleteRejectionReason: (data: number) => dispatch(deleteRejectionReason(data)),
    addRejectableReason: (data: IRejectionReasonAddRequest) => dispatch(addRejectionReason(data)),
    editRejectableReason: (data: IRejectionReasonEditRequest) => dispatch(editRejectionReason(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RejectableReason);
