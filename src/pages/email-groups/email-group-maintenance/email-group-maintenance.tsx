import React, { Dispatch, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../components/table/table';
import { AnyAction } from 'redux';
import { IReduxState } from '../../../modules/store';
import { IEmailGroupMaintenance } from '../../../interfaces/email-groups/email-group-maintenance/get-all-email-group-maintenance';
import {
    copyEmailGroup,
    deleteEmailGroup,
    getAllEmailGroupMaintenanceList,
    getEmailGroup,
    saveEmailGroup,
    updateEmailGroup,
} from '../../../modules/email-groups/email-group-maintenance/email-group-maintenance';
import AddNewEmailGroup from './add-new-email-group';
import UpdateEmailGroup from './update-email-group';
import CopyEmailGroup from './copy-email-group';
import Modal from '../../../components/modal/modal';
import { bin, pencil } from '../../../assets/icons/index';
import { IGetEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/get-email-group';
import { IEmailAddress } from '../../../interfaces/email-groups/email-group-maintenance/email-address';
import { ISaveEmailGroup } from '../../../interfaces/email-groups/email-group-maintenance/save-email-group';
import ConfirmModal from '../../../components/modal/confirm-modal';
import _ from 'lodash';

interface IEmailGroupMaintenanceProps {
    emailGroupMaintenanceList: IEmailGroupMaintenance[];
    getEmailGroupMaintenanceList: () => void;
    getEmailGroup: (id: number) => void;
    emailGroup: IGetEmailGroup;
    copyEmailGroup: (emailGroup: ISaveEmailGroup) => void;
    updateEmailGroup: (emailGroup: ISaveEmailGroup) => void;
    saveEmailGroup: (emailGroup: ISaveEmailGroup) => void;
    deleteEmailGroup: (id: number) => void;
}

const titles = [
    { value: 'name', label: 'Name' },
    { value: 'description', label: 'Description' },
    { value: 'edit', label: '' },
    { value: 'delete', label: '' },
];
interface ITitles {
    value: string;
    label: string;
}

const EmailGroupMaintenance = (props: IEmailGroupMaintenanceProps) => {
    const [addModal, setAddModal] = React.useState(false);
    const [rowId, setRowId] = React.useState(0);
    const [updateModal, setUpdateModal] = React.useState(false);
    const {
        emailGroupMaintenanceList,
        getEmailGroupMaintenanceList,
        getEmailGroup,
        emailGroup,
        copyEmailGroup,
        updateEmailGroup,
        saveEmailGroup,
        deleteEmailGroup,
    } = props;
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const [copyModalStatus, setCopyModalStatus] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = React.useState(0);
    const [copiedEmailAddresses, setCopiedEmailAddresses] = React.useState<IEmailAddress[]>([]);
    const classes = useStyles();

    useEffect(() => {
        getEmailGroupMaintenanceList();
    }, []);

    const deleteEmailGroupItem = (rowId: number) => {
        setDeleteModalStatus(true);
        setSelectedRowId(rowId);
    };

    const renderUpdateModal = (rowId: number) => {
        setRowId(rowId);
        setUpdateModal(true);
    };

    const copyEmailAddresses = (emailAddresses: IEmailAddress[]) => {
        setCopyModalStatus(true);
        setCopiedEmailAddresses(emailAddresses);
    };

    const addRows = (rows: IEmailGroupMaintenance[], titles: ITitles[]) => {
        const tableData = rows.filter(
            (row, index) => (
                (row.delete = (
                    <img
                        key={`key-${index}`}
                        title="Delete"
                        src={bin}
                        className={classes.iconCell}
                        onClick={() => deleteEmailGroupItem(row.id)}
                    />
                )),
                (row.edit = (
                    <img
                        key={`key-${index}`}
                        title="Edit"
                        src={pencil}
                        className={classes.iconCell}
                        onClick={() => renderUpdateModal(row.id)}
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

    const getTitles = (titles: ITitles[]) => [...titles.map((title) => <div key={title.value}>{title.label}</div>)];

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
                            Add a Mail Group
                        </Button>
                    }
                    renderBackButton={true}
                    rows={addRows(emailGroupMaintenanceList, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'md'}
                    title="Add New Email Group"
                    content={<AddNewEmailGroup setModalStatus={setAddModal} onCreateClick={saveEmailGroup} />}
                    modalStatus={addModal}
                    setModalStatus={setAddModal}
                />
                <Modal
                    maxWidth={'md'}
                    title="Update Email Group"
                    content={
                        <UpdateEmailGroup
                            setModalStatus={setUpdateModal}
                            updateModal={updateModal}
                            getEmailGroup={() => getEmailGroup(rowId)}
                            emailGroup={emailGroup}
                            onUpdateClick={updateEmailGroup}
                            setCopiedEmailAddresses={copyEmailAddresses}
                        />
                    }
                    modalStatus={updateModal}
                    setModalStatus={setUpdateModal}
                />
                <Modal
                    maxWidth={'md'}
                    title="Copy Email Group"
                    content={
                        <CopyEmailGroup
                            setCopyModalStatus={setCopyModalStatus}
                            copyModalStatus={copyModalStatus}
                            onUpdateClick={copyEmailGroup}
                            copiedEmailAddresses={copiedEmailAddresses}
                        />
                    }
                    modalStatus={copyModalStatus}
                    setModalStatus={setCopyModalStatus}
                />
                <ConfirmModal
                    title="Confirm"
                    message="Are you sure you want to delete the item?"
                    buttonVariant="text"
                    onSuccess={() => {
                        deleteEmailGroup(selectedRowId);
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
    emailGroupMaintenanceList: _.sortBy(state.emailGroupMaintenanceList.emailGroupMaintenanceList, 'id').reverse(),
    emailGroup: state.emailGroupMaintenanceList.emailGroup,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getEmailGroupMaintenanceList: () => dispatch(getAllEmailGroupMaintenanceList()),
    getEmailGroup: (id: number) => dispatch(getEmailGroup(id)),
    saveEmailGroup: (emailGroup: ISaveEmailGroup) => dispatch(saveEmailGroup(emailGroup)),
    updateEmailGroup: (emailGroup: ISaveEmailGroup) => dispatch(updateEmailGroup(emailGroup)),
    copyEmailGroup: (emailGroup: ISaveEmailGroup) => dispatch(copyEmailGroup(emailGroup)),
    deleteEmailGroup: (id: number) => dispatch(deleteEmailGroup(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EmailGroupMaintenance);
