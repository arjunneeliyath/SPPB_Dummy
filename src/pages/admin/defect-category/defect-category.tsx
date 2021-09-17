import React, { Dispatch, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../components/table/table';
import { bin, pencil } from '../../../assets/icons/index';
import { IDefectList } from '../../../interfaces/admin/defect-category/get-all-defect-category';
import { AnyAction } from 'redux';
import {
    getAllDefectList,
    getDefectCategoryDetails,
    editDefectCategoryDetails,
    deleteDefectCategory,
    createDefectCategory,
} from '../../../modules/admin/defect-category';
import { IReduxState } from '../../../modules/store';
import Modal from '../../../components/modal/modal';
import AddNewDefectCategory from './add-new-defect-category';
import UpdateDefectCategory from './update-defect-category';
import { ISaveDefectCategoryRequest } from '../../../interfaces/admin/defect-category/save-defect-category';
import { IUpdateDefectCategoryRequest } from '../../../interfaces/admin/defect-category/edit-defect-category';
import { IGetDefectCategory } from '../../../interfaces/admin/defect-category/get-defect-category';
import ConfirmModal from '../../../components/modal/confirm-modal';
import { IDeleteDefectValues } from '../../../interfaces/admin/defect-category/delete-defect';
import { deleteDefect } from '../../../modules/admin/defect-category';
import _ from 'lodash';
interface IDefectCategoryProps {
    defectCategoryList: IDefectList[];
    getDefectCategoryList: () => void;
    saveDefectCategory: (defectCategory: ISaveDefectCategoryRequest) => void;
    getDefectCategoryDetails: (categoryId: number) => void;
    defectCategoryDetails: IGetDefectCategory;
    editDefectCategoryDetails: (data: IUpdateDefectCategoryRequest) => void;
    deleteDefectCategory: (data: number) => void;
    deleteDefect: (data: IDeleteDefectValues) => void;
}

const titles = [
    { value: 'name', label: 'Name', sortValue: 'rr' },
    { value: 'description', label: 'Description', sortValue: 'des' },
    { value: 'edit', label: '', sortValue: 'edit', width: '10%' },
    { value: 'delete', label: '', sortValue: 'delete', minWidth: 50 },
];
interface ITitles {
    value: string;
    label: string;
    sortValue: string;
    minWidth?: number;
}

const DefectCategory = (props: IDefectCategoryProps) => {
    const [addModal, setAddModal] = React.useState(false);
    const [rowId, setRowId] = React.useState(0);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = React.useState(0);
    const {
        defectCategoryList,
        getDefectCategoryList,
        getDefectCategoryDetails,
        defectCategoryDetails,
        editDefectCategoryDetails,
        deleteDefectCategory,
        deleteDefect,
        saveDefectCategory,
    } = props;
    const classes = useStyles();

    useEffect(() => {
        getDefectCategoryList();
    }, []);

    const deleteDefectItem = (rowId: number) => {
        setDeleteModalStatus(true);
        setSelectedRowId(rowId);
    };

    const addRows = (rows: IDefectList[], titles: ITitles[]) => {
        const tableData = rows.filter(
            (row, index) => (
                (row.delete = (
                    <img
                        key={`key-${index}`}
                        title="Delete"
                        src={bin}
                        className={classes.iconCell}
                        onClick={() => deleteDefectItem(row.id)}
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

    const renderUpdateModal = (rowId: number) => {
        setRowId(rowId);
        setUpdateModal(true);
    };

    const getTitles = (titles: ITitles[]) => [
        ...titles.map((title) => (
            <div key={title.value} style={{ minWidth: title?.minWidth }}>
                {title.label}
            </div>
        )),
    ];

    const onSaveClick = (values: ISaveDefectCategoryRequest) => {
        saveDefectCategory(values);
        setAddModal(false);
    };

    const onUpdateClick = (values: IUpdateDefectCategoryRequest) => {
        setUpdateModal(false);
        editDefectCategoryDetails(values);
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
                            className={classes.addModalButton}
                        >
                            Add New Defect Category
                        </Button>
                    }
                    renderBackButton={true}
                    rows={addRows(defectCategoryList, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'md'}
                    title="Add New Defect Category"
                    content={<AddNewDefectCategory setModalStatus={setAddModal} onSaveClick={onSaveClick} />}
                    modalStatus={addModal}
                    setModalStatus={setAddModal}
                />
                <Modal
                    maxWidth={'md'}
                    title="Update Defect Category"
                    content={
                        <UpdateDefectCategory
                            setModalStatus={setAddModal}
                            onUpdateClick={onUpdateClick}
                            getDefectCategoryDetails={() => getDefectCategoryDetails(rowId)}
                            defectCategoryDetails={defectCategoryDetails}
                            updateModal={updateModal}
                            onEditCancelClick={() => setUpdateModal(false)}
                            deleteDefect={deleteDefect}
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
                        deleteDefectCategory(selectedRowId);
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
    defectCategoryList: _.sortBy(state.defectCategoryList.defectCategoryList, 'id').reverse(),
    defectCategoryDetails: state.defectCategoryList.defectCategoryDetails,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getDefectCategoryList: () => dispatch(getAllDefectList()),
    getDefectCategoryDetails: (data: number) => dispatch(getDefectCategoryDetails(data)),
    editDefectCategoryDetails: (data: IUpdateDefectCategoryRequest) => dispatch(editDefectCategoryDetails(data)),
    saveDefectCategory: (defectCategory: ISaveDefectCategoryRequest) => dispatch(createDefectCategory(defectCategory)),
    deleteDefectCategory: (data: number) => dispatch(deleteDefectCategory(data)),
    deleteDefect: (data: IDeleteDefectValues) => dispatch(deleteDefect(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DefectCategory);
