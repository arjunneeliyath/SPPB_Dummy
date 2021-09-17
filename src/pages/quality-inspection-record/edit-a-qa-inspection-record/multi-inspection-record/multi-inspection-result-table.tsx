import React, { useEffect, useState } from 'react';
import { FormLabel, Grid, Select, TextField } from '@material-ui/core';
import { useStyles } from './styles';
import CircularIndeterminate from '../../../../components/busy-indicator/busy-indicator';
import Modal from '../../../../components/modal/modal';
import StickyTable from '../../../../components/sticky-table/sticky-table';
import { TimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AttachmentIcon from '@material-ui/icons/AttachFile';
import FileUploader from '../file-uploader/file-uploader';
import RejectionReasonTable from '../rejection-reason-table';
import { IErrorDisplay } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import { IRejectionReason } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/rejection-reason';
import { IEditFormFields } from '../../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';
import { IEditDynamicCic } from '../../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-dynamic-cic';

interface IDoneWithSelectionProps {
    doneWithSelection: IEditFormFields;
    errorDisplay: boolean;
    setErrorFocus: (data: IErrorDisplay) => void;
    errorFocus?: IErrorDisplay;
    updateRejectionReasons: (rejectionReasons: IRejectionReason[], rowIndex?: number) => void;
    handleSelectionChange: (
        event: React.ChangeEvent<any>,
        column: string,
        index?: number,
        attributeId?: number
    ) => void;
    handleChange: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        column: string,
        index?: number,
        attributeId?: number
    ) => void;
    handleDateChange: (date: MaterialUiPickersDate, index?: number) => void;
    onUploadFileClick: (addedFiles: File[], deletedFiles: string[], index?: number) => void;
    columns: ITitles[];
    dynamicCicRow: IEditDynamicCic;
    rowIndex?: number;
    rejRsnErrors: IErrorDisplay[];
    inspectionSaved: string;
}

interface ITitles {
    value: string;
    label: string;
    fixed?: boolean;
    dataTypeName?: string;
    attributeValues?: string[];
    wordWrap?: boolean;
    required?: boolean;
    attributeId?: number;
    type?: string;
    color?: boolean;
}

const ResultTable = (props: IDoneWithSelectionProps) => {
    const recBrand = ['None', 'Other', 'Template'];
    const [dynamicColumns, setDynamicColumns] = useState<ITitles[]>([]);
    const [dynamicCicRows, setDynamicCicRows] = useState<IEditDynamicCic[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewFileModal, setViewFileModal] = React.useState(false);
    const {
        doneWithSelection,
        dynamicCicRow,
        updateRejectionReasons,
        handleSelectionChange,
        handleChange,
        handleDateChange,
        columns,
        onUploadFileClick,
        errorDisplay,
        setErrorFocus,
        errorFocus,
        rowIndex,
        rejRsnErrors,
        inspectionSaved,
    } = props;

    const classes = useStyles();

    useEffect(() => {
        setDynamicCicRows([dynamicCicRow]);
    }, [dynamicCicRow]);

    useEffect(() => {
        if (
            dynamicCicRows?.some(
                (rows) =>
                    rows?.Value6 !== '' ||
                    rows?.Value7 !== '' ||
                    rows?.Value8 !== '' ||
                    rows?.Value9 !== '' ||
                    rows?.Value10 !== ''
            ) &&
            dynamicCicRows?.some(
                (rows) =>
                    rows?.Value6 !== undefined ||
                    rows?.Value7 !== undefined ||
                    rows?.Value8 !== undefined ||
                    rows?.Value9 !== undefined ||
                    rows?.Value10 !== undefined
            )
        ) {
            let count = 0;
            const colorValue = checkIsNaN(dynamicCicRows[0]?.Value6);
            if (colorValue !== 0) {
                count = count + 1;
            }
            const appValue = checkIsNaN(dynamicCicRows[0]?.Value7);
            if (appValue !== 0) {
                count = count + 1;
            }
            const condValue = checkIsNaN(dynamicCicRows[0]?.Value8);
            if (condValue !== 0) {
                count = count + 1;
            }
            const wtValue = checkIsNaN(dynamicCicRows[0]?.Value9);
            if (wtValue !== 0) {
                count = count + 1;
            }
            const qualValue = checkIsNaN(dynamicCicRows[0]?.Value10);
            if (qualValue !== 0) {
                count = count + 1;
            }
            const overAllGradeValue = (appValue + colorValue + condValue + qualValue + wtValue) / count;
            setDynamicCicRows((state) => state.map((row) => ({ ...row, ['Value11']: overAllGradeValue })));
        }
    }, [
        Number(dynamicCicRows[0]?.Value6), //Color
        Number(dynamicCicRows[0]?.Value7), //App
        Number(dynamicCicRows[0]?.Value8), //Cond
        Number(dynamicCicRows[0]?.Value9), //Wt
        Number(dynamicCicRows[0]?.Value10), //Qual
    ]);

    useEffect(() => {
        const tempDynamicColumns: ITitles[] = [];
        doneWithSelection?.formFields.dynamicAttributes?.forEach((column) => {
            if (column.id === 2 || column.id === 3) {
                column.id === 2
                    ? tempDynamicColumns.push({
                          value: dynamicCicRow?.Value2?.value || null,
                          label: column.name,
                          dataTypeName: 'DynamicText',
                          attributeValues: dynamicCicRow?.Value2?.value || null,
                          attributeId: column.id,
                      })
                    : tempDynamicColumns.push({
                          value: dynamicCicRow?.Value3?.value || null,
                          label: column.name,
                          dataTypeName: 'DynamicText',
                          attributeValues: dynamicCicRow?.Value3?.value || null,
                          attributeId: column.id,
                      });
            }
        });
        setIsLoading(false);
        setDynamicColumns([...columns, ...tempDynamicColumns]);
    }, [doneWithSelection]);

    const checkIsNaN = (value: string): number => {
        return isNaN(Number(value)) ? 0 : Number(value);
    };

    const openFileUploader = () => {
        setViewFileModal(true);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const irrationalValues = ['e', '+', '-'];
        const { key } = event;
        if (irrationalValues.includes(key)) {
            event.preventDefault();
        }
    };

    const setFocus = (input: any, index: number, column: ITitles) => {
        index === errorFocus?.rowIndex && column.value === errorFocus.columnName && input?.focus();
    };

    const clearFocus = () => {
        if (errorFocus && errorFocus?.rowIndex > -1) {
            setErrorFocus({ columnName: '', errorMsg: '', rowIndex: -1 });
        }
    };

    const setDST = () => {
        const gmt = new Date();
        const lsm = new Date();
        const lso = new Date();
        lsm.setMonth(2); // March
        lsm.setDate(14);
        let day = lsm.getDay(); // day of week of 14th
        lsm.setDate(14 - day); // second Sunday
        lso.setMonth(10); // November
        lso.setDate(7);
        day = lso.getDay(); // day of week of 7th
        lso.setDate(7 - day); // first Sunday
        return gmt < lsm || gmt >= lso ? 0 : 1;
    };

    const setTimeZone = (): string => {
        const datetime = new Date();
        const tzo = (datetime.getTimezoneOffset() / 60) * -1;
        const dst = setDST();
        let value = '';
        if (value === '') {
            if ((tzo == -9 && dst == 0) || (tzo == -8 && dst == 1)) {
                value = 'AKST';
            }
            if ((tzo == -8 && dst == 0) || (tzo == -7 && dst == 1)) {
                value = 'PST';
            }
            if ((tzo == -7 && dst == 0) || (tzo == -6 && dst == 1)) {
                value = 'MST';
            }
            if ((tzo == -6 && dst == 0) || (tzo == -5 && dst == 1)) {
                value = 'CST';
            }
            if ((tzo == -5 && dst == 0) || (tzo == -4 && dst == 1)) {
                value = 'EST';
            }
            if ((tzo == -4 && dst == 0) || (tzo == -3 && dst == 1)) {
                value = 'AST';
            }
        }
        return value;
    };

    const addRows = (row: IEditDynamicCic) => {
        dynamicColumns?.map((column) => {
            let error1 = false;
            const error = errorDisplay
                ? column.value === 'rejectedQty' &&
                  (Number(row[`${column.value}Value`]) > Number(row.shippedQtyValue) ||
                      Number(row[`${column.value}Value`]) === 0 ||
                      row[`${column.value}Value`] === '')
                : false;

            if (row?.rejectedQtyValue !== '' && row?.passedQtyValue !== '') {
                error1 = errorDisplay
                    ? row.resultsId === '3' &&
                      (column.value === 'rejectedQty' || column.value === 'passedQty') &&
                      Number(row.rejectedQtyValue) + Number(row.passedQtyValue) !== Number(row.shippedQtyValue)
                    : false;
            }

            switch (column.dataTypeName) {
                case 'Text':
                case 'Decimal':
                    row[column.value] = (
                        <TextField
                            key={`entry-${column.value}-${row.rowIndex}`}
                            inputRef={(input) => setFocus(input, row.rowIndex || 0, column)}
                            name={'entry'}
                            onChange={(event) => handleChange(event, column.value, row.rowIndex, column.attributeId)}
                            value={row[`${column.value}Value`]}
                            variant="outlined"
                            size="small"
                            required
                            className={classes.nameTextField}
                            title="Please enter a value"
                            id={`${column.value}-${row.rowIndex}`}
                            type={column.type || 'number'}
                            onKeyDown={onKeyDown}
                            inputProps={{ min: 0, max: 99, step: 1 }}
                            disabled={
                                column.value === 'shippedQty' ||
                                column.value === 'passedQty' ||
                                (row.resultsValue === 'Pass/Fail' ? false : column.value === 'rejectedQty')
                            }
                            error={
                                (column.required &&
                                    (row[`${column.value}Value`] === undefined ||
                                        row[`${column.value}Value`]?.trim() === '')) ||
                                error ||
                                error1
                            }
                            onBlur={clearFocus}
                        />
                    );
                    break;
                case 'SelectDropDownRejectionReason':
                    row[column.value] = (
                        <Select
                            native
                            variant="outlined"
                            title="Rejection Reasons"
                            value={row[`${column.value}Value`]}
                            defaultValue={''}
                            onChange={(event) => handleSelectionChange(event, column.value, row.rowIndex)}
                            name={'select'}
                            className={classes.selectField}
                            error={row[`${column.value}Value`] === '' || row[`${column.value}Value`] === undefined}
                        >
                            <optgroup className={classes.option}>
                                <option key={0} value={''} disabled hidden></option>
                                {doneWithSelection.formFields.basicRejReasons?.map((item, i) => (
                                    <option key={`key-${i}`} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </optgroup>
                        </Select>
                    );
                    break;
                case 'SelectDropDownCurrentLocation':
                    row[column.value] = (
                        <Select
                            native
                            variant="outlined"
                            title="Current Location"
                            value={row[`${column.value}Value`]}
                            defaultValue={''}
                            onChange={(event) => handleSelectionChange(event, column.value, row.rowIndex)}
                            name={'select'}
                            className={classes.selectField}
                            error={row[`${column.value}Value`] === '' || row[`${column.value}Value`] === undefined}
                        >
                            <optgroup className={classes.option}>
                                <option key={0} value={''} disabled hidden></option>
                                {doneWithSelection.formFields.currentLocations?.map((item, i) => (
                                    <option key={`key-${i}`} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </optgroup>
                        </Select>
                    );
                    break;
                case 'SelectRecBrand':
                    row[column.value] = (
                        <Select
                            native
                            variant="outlined"
                            title="Rec Brand"
                            value={row[`${column.value}Value`]}
                            defaultValue={row[`${column.value}Value`]}
                            onChange={(event) => handleSelectionChange(event, column.value, row.rowIndex)}
                            name={'select'}
                            className={classes.selectRecBrand}
                        >
                            <optgroup className={classes.option}>
                                <option key={0} value={''}></option>
                                {recBrand?.map((item, i) => (
                                    <option key={`key-${i}`} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </optgroup>
                        </Select>
                    );
                    break;
                case 'SelectTimeZone':
                    row[column.value] = (
                        <Select
                            native
                            variant="outlined"
                            title="Time Zone"
                            value={row[`${column.value}Value`] || setTimeZone()}
                            defaultValue={''}
                            onChange={(event) => handleSelectionChange(event, column.value, row.rowIndex)}
                            name={'select'}
                            className={classes.selectField}
                            error={row[`${column.value}Value`] === '' || row[`${column.value}Value`] === undefined}
                        >
                            <optgroup className={classes.option}>
                                <option key={0} value={''} disabled hidden></option>
                                {doneWithSelection.formFields.timezones?.map((item, i) => (
                                    <option key={`key-${i}`} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </optgroup>
                        </Select>
                    );
                    break;
                case 'TimePicker':
                    row[column.value] = (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker
                                className={classes.timeField}
                                value={row.startTimeValue}
                                onChange={(date) => handleDateChange(date, row.rowIndex)}
                            />
                        </MuiPickersUtilsProvider>
                    );
                    break;
                case 'InsertFile':
                    row[column.value] = (
                        <AttachmentIcon
                            titleAccess="Attach File"
                            color="primary"
                            style={{ cursor: 'pointer' }}
                            className={classes.iconCell}
                            onClick={openFileUploader}
                        />
                    );
                    break;
                case 'DynamicText':
                    row[column.value] = <FormLabel className={classes.labelField}>{column.attributeValues}</FormLabel>;
                    break;
                case 'Label':
                    row[column.value] = (
                        <div className={row.resultsValue === 'Pass' ? classes.pass : classes.fail}>
                            {row[column.value]}
                        </div>
                    );
                    break;
            }
        });
        return row;
    };

    return (
        <div>
            {isLoading ? (
                <CircularIndeterminate />
            ) : (
                <Grid container>
                    <StickyTable rows={[addRows(dynamicCicRow)]} titles={JSON.parse(JSON.stringify(dynamicColumns))} />
                    <Modal
                        maxWidth={'sm'}
                        title="Add Files"
                        content={
                            <FileUploader
                                setIndex={0}
                                handleUpdate={onUploadFileClick}
                                setModalStatus={setViewFileModal}
                                files={dynamicCicRow.recFiles || []}
                            />
                        }
                        modalStatus={viewFileModal}
                        setModalStatus={setViewFileModal}
                    />
                    <RejectionReasonTable
                        doneWithSelection={doneWithSelection}
                        updateRejectionReasons={(rej) => updateRejectionReasons(rej, rowIndex)}
                        rejRsnErrors={rejRsnErrors.filter((x) => x.itemIndex === rowIndex)}
                        rejectionReasons={dynamicCicRow?.rejectionReasons}
                        inspectionSaved={inspectionSaved}
                    />
                </Grid>
            )}
        </div>
    );
};

export default ResultTable;
