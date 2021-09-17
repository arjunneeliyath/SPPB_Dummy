import React, { Dispatch, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Modal from '../../../components/modal/modal';
import { connect } from 'react-redux';
import AddDisposition from './add-disposition';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../components/table/table';
import { bin, pencil } from '../../../assets/icons/index';
import EditDispositionForm from './edit-disposition';
import { IDispositionList } from '../../../interfaces/admin/disposition/get-all-disposition';
import { IReduxState } from '../../../modules/store';
import { AnyAction } from 'redux';
import {
    getAllDispositionList,
    addDisposition,
    editDisposition,
    deleteDisposition,
} from '../../../modules/admin/disposition';
import ConfirmModal from '../../../components/modal/confirm-modal';
import { IDispositionEditRequest } from '../../../interfaces/admin/disposition/edit-dispostion';
import { IDispositionAddRequest } from '../../../interfaces/admin/disposition/add-disposition';
import _ from 'lodash';

interface IDispositionProps {
    dispositionList: IDispositionList[];
    getDispositionList: () => void;
    deleteDisposition: (data: number) => void;
    addDispositionList: (data: IDispositionAddRequest) => void;
    editDispositionList: (data: IDispositionEditRequest) => void;
}

const titles = [
    { value: 'name', label: 'Disposition', sortValue: 'rr' },
    { value: 'desc', label: 'Description', sortValue: 'des' },
    { value: 'edit', label: '', sortValue: 'edit', width: '10%' },
    { value: 'delete', label: '', sortValue: 'delete', minWidth: 50 },
];
interface ITitles {
    value: string;
    label: string;
    sortValue: string;
    minWidth?: number;
}

const initialValues: IDispositionList = {
    id: 0,
    name: '',
    desc: '',
};

const DispositionList = (props: IDispositionProps) => {
    const [addModal, setAddModal] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [dispositionData, setDispositionData] = React.useState<IDispositionList>(initialValues);
    const { dispositionList, getDispositionList, deleteDisposition, addDispositionList, editDispositionList } = props;
    const [selectedRowId, setSelectedRowId] = React.useState(0);
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const classes = useStyles();

    useEffect(() => {
        getDispositionList();
    }, []);

    const editDispositionItem = (row: IDispositionList) => {
        setEditModal(true);
        setDispositionData(row);
    };

    const deleteDispositonItem = (rowId: number) => {
        setDeleteModalStatus(true);
        setSelectedRowId(rowId);
    };
    const onUpdateClick = (values: IDispositionList) => {
        editDispositionList(values);
    };
    const onSaveClick = (values: IDispositionList) => {
        addDispositionList(values);
    };

    const addRows = (rows: IDispositionList[], titles: ITitles[]) => {
        const tableData = rows.filter(
            (row, index) => (
                (row.delete = (
                    <img
                        key={`key-${index}`}
                        title="Delete"
                        src={bin}
                        className={classes.iconCell}
                        onClick={() => deleteDispositonItem(row.id)}
                    />
                )),
                (row.edit = (
                    <img
                        key={`key-${index}`}
                        title="Edit"
                        src={pencil}
                        className={classes.iconCell}
                        onClick={() => editDispositionItem(row)}
                    />
                ))
            )
        );
        return tableData?.map((row) => [
            ...titles.map((title, index) => (
                <div key={`${title.value}-${index}`} title={(row as any)[title.value]} className={classes.tableCell}>
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
                            Add a Disposition
                        </Button>
                    }
                    renderBackButton={true}
                    rows={addRows(dispositionList, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Add a Disposition"
                    content={<AddDisposition setModalStatus={setAddModal} onSaveClick={onSaveClick} />}
                    modalStatus={addModal}
                    setModalStatus={setAddModal}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Update A Disposition"
                    content={
                        <EditDispositionForm
                            setModalStatus={setEditModal}
                            dispositionData={dispositionData}
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
                        deleteDisposition(selectedRowId);
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
    dispositionList: _.sortBy(state.disposition.dispositionDetails, 'id').reverse(),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getDispositionList: () => dispatch(getAllDispositionList()),
    deleteDisposition: (data: number) => dispatch(deleteDisposition(data)),
    addDispositionList: (data: IDispositionAddRequest) => dispatch(addDisposition(data)),
    editDispositionList: (data: IDispositionEditRequest) => dispatch(editDisposition(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DispositionList);
