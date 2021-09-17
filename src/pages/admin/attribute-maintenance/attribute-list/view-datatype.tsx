import React, { ReactElement, useEffect, useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import { IDataType } from '../../../../interfaces/admin/attribute-maintenance/attribute-list/get-datatype';
import { IValueSet } from '../../../../interfaces/admin/attribute-maintenance/data-type-list/value-set';
import TableComponent from '../../../../components/table/table';
import { FormLabel } from '@material-ui/core';
import CircularIndeterminate from '../../../../components/busy-indicator/busy-indicator';

interface IViewFormProps {
    dataTypeView: IDataType;
    dataTypeViewModal: boolean;
    setDataTypeViewModal: (modalStatus: boolean) => void;
    getDataTypeView: (data: number) => void;
    dataTypeId: number;
}

const titles = [
    { value: 'seqNbr', label: 'Seq#' },
    { value: 'name', label: 'Value' },
    { value: 'description', label: 'Description' },
];

interface ITitles {
    value: string;
    label: string;
}

const DataTypeViewForm = (props: IViewFormProps) => {
    const { dataTypeViewModal, getDataTypeView, dataTypeId, dataTypeView } = props;
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (dataTypeViewModal) {
            getDataTypeView(dataTypeId);
            setIsLoading(true);
        }
    }, [dataTypeViewModal]);

    useEffect(() => {
        if (isLoading && dataTypeView?.id) {
            setIsLoading(false);
        }
    }, [dataTypeView]);

    const addRows = (rows: IValueSet[], titles: ITitles[]) => {
        return rows?.map((row) => [
            ...titles.map((title, index) => (
                <div key={`${title.value}-${index}`} title={(row as any)[title.value]} className={classes.tableCell}>
                    {(row as any)[title.value]}
                </div>
            )),
        ]);
    };

    const getTitles = (titles: ITitles[]) => [...titles.map((title) => <div key={title.value}>{title.label}</div>)];

    const getValue: string = dataTypeView?.valueSetList
        ?.map((item) => {
            return item.name;
        })
        .toString();

    const renderValueSet = (): ReactElement => {
        if (dataTypeView?.id) {
            return dataTypeView.name === 'LevelGrade(5)' ? (
                <Grid item>
                    <FormLabel className={classes.formLabel}>
                        Value Set
                        <TableComponent
                            hidePagination={true}
                            renderBackButton={false}
                            rows={addRows(dataTypeView.valueSetList, titles)}
                            titles={getTitles(titles)}
                        />
                    </FormLabel>
                </Grid>
            ) : (
                <Grid item className={classes.boxPadding}>
                    <Grid container>
                        <Grid item sm={4} xs={5}>
                            <FormLabel className={classes.formLabel}>Value Set </FormLabel>
                        </Grid>
                        <Grid item sm={8} xs={7}>
                            {getValue}
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        return <></>;
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box className={classes.boxStyle}>
                    <Grid container>
                        <Grid item xs={12} className={classes.rowContainer}>
                            {isLoading ? (
                                <CircularIndeterminate />
                            ) : (
                                <Grid container direction="column">
                                    <Grid item className={classes.boxPadding}>
                                        <Grid container>
                                            <Grid item sm={4} xs={5}>
                                                <FormLabel className={classes.formLabel}>ID </FormLabel>
                                            </Grid>
                                            <Grid item sm={8} xs={7}>
                                                {dataTypeView.id}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item className={classes.boxPadding}>
                                        <Grid container>
                                            <Grid item sm={4} xs={5}>
                                                <FormLabel className={classes.formLabel}>Name</FormLabel>
                                            </Grid>
                                            <Grid item sm={8} xs={7}>
                                                {dataTypeView.name}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item className={classes.boxPadding}>
                                        <Grid container>
                                            <Grid item sm={4} xs={5}>
                                                <FormLabel className={classes.formLabel}>Description</FormLabel>
                                            </Grid>
                                            <Grid item sm={8} xs={7}>
                                                {dataTypeView.desc}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item className={classes.boxPadding}>
                                        <Grid container>
                                            <Grid item sm={4} xs={5}>
                                                <FormLabel className={classes.formLabel}>Category</FormLabel>
                                            </Grid>
                                            <Grid item sm={8} xs={7}>
                                                {dataTypeView.code}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {renderValueSet()}
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DataTypeViewForm;
