import React, { Dispatch, useEffect } from 'react';
import { List, ListItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../../components/table/table';
import { IReduxState } from '../../../../modules/store';
import { AnyAction } from 'redux';
import {
    getAllDataTypeList,
    createDataType,
    editDataType,
    deletedDataType,
} from '../../../../modules/admin/attribute-maintenance/data-type-list/data-type-list';
import { IDataTypeList } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/data-type-list';
import { ISaveDataTypeRequest } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/add-data-type';
import { IValueSet } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/value-set';
import { Button } from '@material-ui/core';
import Modal from '../../../../components/modal/modal';
import AddNewDataType from './add-data-type';
import UpdateDataType from './update-data-type';
import { IEditDataTypeRequest } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/update-data-type';
import { bin, pencil } from '../../../../assets/icons/index';
import ConfirmModal from '../../../../components/modal/confirm-modal';

interface IDataTypeProps {
    dataTypeList: IDataTypeList[];
    getDataTypeList: () => void;
    saveDataType: (dataType: ISaveDataTypeRequest) => void;
    editDataType: (data: IEditDataTypeRequest) => void;
    deletedDataType: (data: number) => void;
}

const titles = [
    { value: 'name', label: 'Name' },
    { value: 'desc', label: 'Description' },
    { value: 'code', label: 'Category' },
    { value: 'valueSetList', label: 'Value Set' },
    { value: 'edit', label: '' },
    { value: 'delete', label: '' },
];
interface ITitles {
    value: string;
    label: string;
    minWidth?: number;
}
const initialValues: IDataTypeList = {
    id: 0,
    name: '',
    desc: '',
    code: '',
    valueSetSW: '',
    valueSetList: [
        {
            dataTypeId: 0,
            seqNbr: 0,
            name: '',
            description: '',
        },
    ],
};

const DataTypeList = (props: IDataTypeProps) => {
    const { dataTypeList, getDataTypeList, saveDataType, editDataType, deletedDataType } = props;
    const [addModal, setAddModal] = React.useState(false);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [dataType, setDataType] = React.useState<IDataTypeList>(initialValues);
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = React.useState(0);
    const classes = useStyles();

    useEffect(() => {
        getDataTypeList();
    }, []);

    const valueSetType = (value: IValueSet[]) => {
        return (
            <List>
                {value.map((item, i) => (
                    <ListItem className={classes.listComponent} key={i}>
                        {item.name}
                    </ListItem>
                ))}
            </List>
        );
    };
    const deleteDataType = (rowId: number) => {
        setDeleteModalStatus(true);
        setSelectedRowId(rowId);
    };
    const onEditClick = (row: IDataTypeList) => {
        setUpdateModal(true);
        setDataType(row);
    };

    const addRows = (rows: IDataTypeList[], titles: ITitles[]) => {
        const tableData = rows.filter(
            (row, index) => (
                (row.delete =
                    row.code !== 'System Defined Item Attribute' ? (
                        <img
                            key={`key-${index}`}
                            title="Delete"
                            src={bin}
                            className={classes.iconCell}
                            onClick={() => deleteDataType(row.id)}
                        />
                    ) : (
                        <></>
                    )),
                (row.edit =
                    row.code !== 'System Defined Item Attribute' ? (
                        <img
                            key={`key-${index}`}
                            title="Edit"
                            src={pencil}
                            className={classes.iconCell}
                            onClick={() => onEditClick(row)}
                        />
                    ) : (
                        <></>
                    ))
            )
        );
        return tableData?.map((row) => [
            ...titles.map((title, index) => {
                let value = (row as any)[title.value];
                if (title.value === 'valueSetList') {
                    value = valueSetType(value);
                }
                return (
                    <>
                        {row.code === 'System Defined Item Attribute' ? (
                            <div
                                key={`${title.value}-${index}`}
                                title={(row as any)[title.value]}
                                className={classes.tableCell}
                            >
                                {title.value === 'code' && value === 'System Defined Item Attribute'
                                    ? value.charAt(0)
                                    : value}
                            </div>
                        ) : (
                            <div
                                key={`${title.value}-${index}`}
                                title={(row as any)[title.value]}
                                className={classes.tableCell}
                            >
                                {title.value === 'code' && value === 'User Defined Item Attribute'
                                    ? value.charAt(0)
                                    : value}
                            </div>
                        )}
                    </>
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
    const onSaveClick = (values: ISaveDataTypeRequest) => {
        saveDataType(values);
        setAddModal(false);
    };
    const onUpdateClick = (values: IEditDataTypeRequest) => {
        setUpdateModal(false);
        editDataType(values);
    };
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
                            Add A New Data Type
                        </Button>
                    }
                    renderBackButton={true}
                    rows={addRows(dataTypeList, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'md'}
                    title="Add A New Data Type"
                    content={<AddNewDataType setModalStatus={setAddModal} onSaveClick={onSaveClick} />}
                    modalStatus={addModal}
                    setModalStatus={setAddModal}
                />
                <Modal
                    maxWidth={'md'}
                    title="Edit A Data Type"
                    content={
                        <UpdateDataType
                            setModalStatus={setUpdateModal}
                            onUpdateClick={onUpdateClick}
                            dataType={dataType}
                        />
                    }
                    modalStatus={updateModal}
                    setModalStatus={setUpdateModal}
                />
                <ConfirmModal
                    title="Confirm"
                    message="Are you sure you want to delete the item?"
                    buttonVariant="text"
                    onSuccess={() => {
                        deletedDataType(selectedRowId);
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
    dataTypeList: state.dataTypeList.dataTypeList,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getDataTypeList: () => dispatch(getAllDataTypeList()),
    saveDataType: (dataTypes: ISaveDataTypeRequest) => dispatch(createDataType(dataTypes)),
    editDataType: (data: IEditDataTypeRequest) => dispatch(editDataType(data)),
    deletedDataType: (data: number) => dispatch(deletedDataType(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DataTypeList);
