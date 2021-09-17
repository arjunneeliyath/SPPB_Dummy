import React, { Dispatch, useEffect, useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';
import TableComponent from '../../../../components/table/table';
import { IReduxState } from '../../../../modules/store';
import { AnyAction } from 'redux';
import {
    editAttributeMaintenance,
    getAllAttributeList,
} from '../../../../modules/admin/attribute-maintenance/attribute-maintenance';
import { IDataType } from '../../../../interfaces/admin/attribute-maintenance/attribute-list/get-datatype';
import Modal from '../../../../components/modal/modal';
import DataTypeViewForm from './view-datatype';
import UpdateAttributeItem from './update-attribute';
import { getDataType } from '../../../../modules/admin/attribute-maintenance/datatype-view';
import { IAttribute } from '../../../../interfaces/admin/attribute-maintenance/attribute-list/get-all-attribute';
import { IAttributeMaintenanceEditRequest } from '../../../../interfaces/admin/attribute-maintenance/attribute-list/edit-attribute';

interface IAttributeProps {
    attributeList: IAttribute[];
    getAttributeList: () => void;
    dataTypeView: IDataType;
    getDataTypeView: (data: number) => void;
    onUpdateClick: (data: IAttributeMaintenanceEditRequest) => void;
    setModalStatus: (modalStatus: boolean) => void;
}

const titles = [
    { value: 'name', label: 'Name' },
    { value: 'description', label: 'Description' },
    { value: 'dataType', label: 'Data Type' },
    { value: 'attrType', label: 'Attribute Type' },
    { value: 'attrRecordType', label: 'Attribute Record Type' },
    { value: 'attrWeight', label: 'Attribute Weight %' },
    { value: 'attrFailureLimit', label: 'Attribute Failure Limit %' },
    { value: 'itemType', label: 'Item Type' },
    { value: 'user', label: 'User Id' },
];
interface ITitles {
    value: string;
    label: string;
    minWidth?: number;
}

const AttributeList = (props: IAttributeProps) => {
    const [updateModal, setUpdateModal] = useState(false);
    const [dataTypeId, setDataTypeId] = useState(0);
    const [attributeItem, setAttributeItem] = useState({});
    const { attributeList, getAttributeList, getDataTypeView, dataTypeView, onUpdateClick } = props;
    const [dataTypeViewModal, setDataTypeViewModal] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        getAttributeList();
    }, []);

    const renderViewModal = (dataTypeId: number) => {
        setDataTypeViewModal(true);
        setDataTypeId(dataTypeId);
    };

    const attributeRecordType = (value: string[]) => {
        return (
            <List>
                {value.map((item, i) => (
                    <ListItem className={classes.listComponent} key={i}>{`\u2022 ${item}`}</ListItem>
                ))}
            </List>
        );
    };

    const onLinkClick = (value: string, row: IAttribute) => {
        if (value === 'name') {
            setUpdateModal(true);
            setAttributeItem(row);
        } else if (value === 'dataType') {
            renderViewModal(row.dataTypeId);
        }
    };

    const addRows = (rows: IAttribute[], titles: ITitles[]) => {
        return rows?.map((row) => [
            ...titles.map((title, index) => {
                let value = (row as any)[title.value];
                if (title.value === 'attrRecordType') {
                    value = attributeRecordType(value);
                }
                if (title.value === 'attrWeight' || title.value === 'attrFailureLimit') {
                    value = Number(value).toFixed(2);
                }
                return (
                    <div
                        key={`${title.value}-${index}`}
                        title={(row as any)[title.value]}
                        className={
                            title.value === 'name' || title.value === 'dataType' ? classes.iconCell : classes.tableCell
                        }
                        onClick={() => onLinkClick(title.value, row)}
                    >
                        {value}
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
    const attributeListData = attributeList.filter((data) => data.attrRecTypeForDC === false);

    return (
        <div className={classes.gridContainer}>
            <Grid container>
                <TableComponent
                    renderBackButton={true}
                    rows={addRows(attributeListData, titles)}
                    titles={getTitles(titles)}
                />
                <Modal
                    maxWidth={'xs'}
                    title="Data Type View"
                    content={
                        <DataTypeViewForm
                            setDataTypeViewModal={setDataTypeViewModal}
                            dataTypeViewModal={dataTypeViewModal}
                            dataTypeView={dataTypeView}
                            getDataTypeView={getDataTypeView}
                            dataTypeId={dataTypeId}
                        />
                    }
                    modalStatus={dataTypeViewModal}
                    setModalStatus={setDataTypeViewModal}
                />
                <Modal
                    maxWidth={'md'}
                    title="Edit an Attribute"
                    content={
                        <UpdateAttributeItem
                            setModalStatus={setUpdateModal}
                            onUpdateClick={onUpdateClick}
                            attributeItem={attributeItem}
                        />
                    }
                    modalStatus={updateModal}
                    setModalStatus={setUpdateModal}
                />
            </Grid>
        </div>
    );
};

const mapStateToProps = (state: IReduxState) => ({
    attributeList: state.attributeMaintenance.attributeList,
    dataTypeView: state.dataType.dataTypeData,
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getAttributeList: () => dispatch(getAllAttributeList()),
    getDataTypeView: (data: number) => dispatch(getDataType(data)),
    onUpdateClick: (data: IAttributeMaintenanceEditRequest) => dispatch(editAttributeMaintenance(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AttributeList);
