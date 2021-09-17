import React, { Dispatch, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Modal from '../../../components/modal/modal';
import { connect } from 'react-redux';
import AddLocation from './add-location';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../components/table/table';
import { bin, pencil } from '../../../assets/icons/index';
import EditLocationForm from './edit-location';
import ConfirmModal from '../../../components/modal/confirm-modal';
import { ILocationList } from '../../../interfaces/admin/location/get-all-location';
import { IReduxState } from '../../../modules/store';
import { AnyAction } from 'redux';
import { getAllLocationList, editLocation, addLocation, deleteLocation } from '../../../modules/admin/location';
import { ILocationEditRequest } from '../../../interfaces/admin/location/edit-location';
import { ILocationAddRequest } from '../../../interfaces/admin/location/add-location';
import _ from 'lodash';

interface ILocationProps {
    locationList: ILocationList[];
    getLocationList: () => void;
    deleteLocation: (data: number) => void;
    addLocationList: (data: ILocationAddRequest) => void;
    editLocationList: (data: ILocationEditRequest) => void;
}
const titles = [
    { value: 'locationName', label: 'Location', sortValue: 'rr' },
    { value: 'locationDesc', label: 'Description', sortValue: 'des' },
    { value: 'edit', label: '', sortValue: 'edit', width: '10%' },
    { value: 'delete', label: '', sortValue: 'delete', minWidth: 50 },
];

interface ITitles {
    value: string;
    label: string;
    sortValue: string;
    minWidth?: number;
}
const initialValues: ILocationList = {
    id: 0,
    locationName: '',
    locationDesc: '',
};
const LocationList = (props: ILocationProps) => {
    const [addModal, setAddModal] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = React.useState(false);
    const { locationList, getLocationList, editLocationList, deleteLocation, addLocationList } = props;
    const [selectedRowId, setSelectedRowId] = React.useState(0);
    const [locationData, setLocationData] = React.useState<ILocationList>(initialValues);
    const classes = useStyles();

    useEffect(() => {
        getLocationList();
    }, []);

    const onUpdateClick = (values: ILocationEditRequest) => {
        editLocationList(values);
    };

    const editLocationItem = (row: ILocationList) => {
        setEditModal(true);
        setLocationData(row);
    };

    const deleteLocationItem = (rowId: number) => {
        setDeleteModalStatus(true);
        setSelectedRowId(rowId);
    };

    const onSaveClick = (values: ILocationAddRequest) => {
        addLocationList(values);
    };

    const addRows = (rows: ILocationList[], titles: ITitles[]) => {
        const tableData = rows.filter(
            (row, index) => (
                (row.delete = (
                    <img
                        key={`key-${index}`}
                        title="Delete"
                        src={bin}
                        className={classes.iconCell}
                        onClick={() => deleteLocationItem(row.id)}
                    />
                )),
                (row.edit = (
                    <img
                        key={`key-${index}`}
                        title="Edit"
                        src={pencil}
                        className={classes.iconCell}
                        onClick={() => editLocationItem(row)}
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
            <div key={title.value} role={title.label} style={{ minWidth: title?.minWidth }}>
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
                            role="add-btn"
                        >
                            Add A Location
                        </Button>
                    }
                    renderBackButton={true}
                    rows={addRows(locationList, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Add A Location"
                    content={<AddLocation setModalStatus={setAddModal} onSaveClick={onSaveClick} />}
                    modalStatus={addModal}
                    setModalStatus={setAddModal}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Update A Location"
                    content={
                        <EditLocationForm
                            setModalStatus={setEditModal}
                            locationData={locationData}
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
                        deleteLocation(selectedRowId);
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
    locationList: _.sortBy(state.location.locationDetails, 'id').reverse(),
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getLocationList: () => dispatch(getAllLocationList()),
    deleteLocation: (data: number) => dispatch(deleteLocation(data)),
    addLocationList: (data: ILocationAddRequest) => dispatch(addLocation(data)),
    editLocationList: (data: ILocationEditRequest) => dispatch(editLocation(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
