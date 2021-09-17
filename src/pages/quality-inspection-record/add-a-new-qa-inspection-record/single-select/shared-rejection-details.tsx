import React from 'react';
import { Grid, Input, Select, TextField } from '@material-ui/core';
import { useStyles } from './styles';
import { IDoneWithSelection } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import { ISingleSelectCic } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/single-select-cic';
import { camera } from '../../../../assets/icons/index';
import ImageUpload from '../image-capture/image-upload';
import Modal from '../../../../components/modal/modal';
import StickyTable from '../../../../components/sticky-table/sticky-table';
import { TimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AttachmentIcon from '@material-ui/icons/AttachFile';
import FileUploader from '../file-uploader/file-uploader';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IDoneWithSelectionProps {
    doneWithSelection: IDoneWithSelection;
    handleChange: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
        column: string,
        attributeId?: number
    ) => void;
    handleSelectionChange: (event: React.ChangeEvent<any>, index: number, column: string, attributeId?: number) => void;
    onUploadClick: (values: File[], index: number) => void;
    onUploadFileClick: (files: File[], index: number) => void;
    handleDateChange: (date: MaterialUiPickersDate, index: number) => void;
    dynamicCicRows: ISingleSelectCic[];
    columns: ITitles[];
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
}

const SharedRejectionReason = (props: IDoneWithSelectionProps) => {
    const recBrand = ['None', 'Other', 'Template'];
    const {
        doneWithSelection,
        handleChange,
        handleSelectionChange,
        onUploadClick,
        onUploadFileClick,
        handleDateChange,
        dynamicCicRows,
        columns,
    } = props;
    const [viewModal, setViewModal] = React.useState(false);
    const [viewFileModal, setViewFileModal] = React.useState(false);
    const [indexPics, setIndexPics] = React.useState<number>(0);

    const classes = useStyles();

    const openPhotoUploader = (index: any) => {
        setViewModal(true);
        setIndexPics(index);
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

    const addRows = (rows: ISingleSelectCic[]) => {
        rows?.map((row, index) => {
            columns?.map((column) => {
                switch (column.dataTypeName) {
                    case 'Text': //Only for dynamic columns
                    case 'Decimal':
                        row[column.value] = (
                            <TextField
                                key={`entry-${column.value}-${index}`}
                                name={'entry'}
                                onChange={(event) => handleChange(event, index, column.value, column.attributeId)}
                                value={
                                    row[`Value${column.value}`]?.value?.toString()?.charAt(0) === '.'
                                        ? `0${row[`Value${column.value}`]?.value}`
                                        : row[`Value${column.value}`]?.value
                                }
                                variant="outlined"
                                size="small"
                                required
                                className={classes.nameTextField}
                                title="Please enter a value"
                                id={column.attributeId?.toString()}
                                type="number"
                                onKeyDown={onKeyDown}
                                inputProps={{ min: 0, max: 99, step: 1 }}
                                disabled={column.attributeId === 11}
                                error={
                                    column.required &&
                                    (row[`Value${column.value}`]?.value === undefined ||
                                        row[`Value${column.value}`]?.value?.trim() === '')
                                }
                            />
                        );
                        break;
                    case 'TextField':
                        row[column.value] = (
                            <TextField
                                key={`entry-${column.value}-${index}`}
                                name={'entry'}
                                onChange={(event) => handleChange(event, index, column.value, column.attributeId)}
                                value={row[`${column.value}Value`]}
                                variant="outlined"
                                size="small"
                                required
                                className={classes.nameTextField}
                                title="Please enter a value"
                                id={column.attributeId?.toString()}
                                type="string"
                                onKeyDown={onKeyDown}
                                inputProps={{ min: 0, max: 99, step: 1 }}
                                error={
                                    column.required &&
                                    (row[`${column.value}Value`] === undefined ||
                                        row[`${column.value}Value`]?.trim() === '')
                                }
                            />
                        );
                        break;
                    case 'LevelGrade(5)':
                    case 'LevelGrade(10)': //Only for dynamic columns
                        row[column.value] = (
                            <Select
                                native
                                error={
                                    column.required &&
                                    (row[`Value${column.value}`]?.value === undefined ||
                                        row[`Value${column.value}`]?.value === '')
                                }
                                variant="outlined"
                                title="Please select a value"
                                value={row[`Value${column.value}`]?.value}
                                defaultValue={''}
                                onChange={(event) =>
                                    handleSelectionChange(event, index, column.value, column.attributeId)
                                }
                                name={'select'}
                                input={<Input />}
                                className={classes.selectbox}
                                id={column.attributeId?.toString()}
                            >
                                <optgroup className={classes.option}>
                                    <option key={0} value={''}></option>
                                    {column.attributeValues?.map((item, i) => (
                                        <option key={`key-${i}`} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </optgroup>
                            </Select>
                        );
                        break;
                    case 'SelectDropDownRejectionReason':
                        row[column.value] = (
                            <Select
                                native
                                error={
                                    column.required &&
                                    (row[`${column.value}Value`] === undefined || row[`${column.value}Value`] === '')
                                }
                                variant="outlined"
                                title="Rejection Reasons"
                                value={row[`${column.value}Value`]}
                                defaultValue={''}
                                onChange={(event) => handleSelectionChange(event, index, column.value)}
                                name={'select'}
                                className={classes.selectField}
                            >
                                <optgroup className={classes.option}>
                                    <option key={0} value={''} disabled hidden></option>
                                    {doneWithSelection.basicRejReasons?.map((item, i) => (
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
                                error={
                                    column.required &&
                                    (row[`${column.value}Value`] === undefined || row[`${column.value}Value`] === '')
                                }
                                variant="outlined"
                                title="Current Location"
                                value={row[`${column.value}Value`]}
                                defaultValue={''}
                                onChange={(event) => handleSelectionChange(event, index, column.value)}
                                name={'select'}
                                className={classes.selectField}
                            >
                                <optgroup className={classes.option}>
                                    <option key={0} value={''} disabled hidden></option>
                                    {doneWithSelection.currentLocations?.map((item, i) => (
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
                                value={row[`Value${column.value}`]}
                                defaultValue={''}
                                onChange={(event) => handleSelectionChange(event, index, column.value)}
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
                                error={
                                    column.required &&
                                    (row[`${column.value}Value`] === undefined || row[`${column.value}Value`] === '')
                                }
                                variant="outlined"
                                title="Time Zone"
                                value={row[`${column.value}Value`] || setTimeZone()}
                                defaultValue={''}
                                onChange={(event) => handleSelectionChange(event, index, column.value)}
                                name={'select'}
                                className={classes.selectField}
                            >
                                <optgroup className={classes.option}>
                                    <option key={0} value={''} disabled hidden></option>
                                    {doneWithSelection.timezones?.map((item, i) => (
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
                                    onChange={(date) => handleDateChange(date, index)}
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
                    case 'CameraIcon':
                        row[column.value] = (
                            <img
                                key={`key-${index}`}
                                title="Gallery"
                                src={camera}
                                className={classes.iconCell}
                                onClick={() => openPhotoUploader(index)}
                            />
                        );
                        break;
                }
            });
        });
        return rows?.map((row) => row);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <h4 className={classes.padLeft}>Shared Rejection Details</h4>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.ratingalign}>
                        <h4 className={classes.ratingText}>Enumeration values 1-5, in increasing order of quality</h4>
                    </div>
                </Grid>

                <StickyTable rows={addRows(dynamicCicRows)} titles={columns} />
                <Modal
                    maxWidth={'sm'}
                    title="Add Pictures"
                    content={
                        <ImageUpload
                            setIndex={indexPics}
                            handleUpdate={onUploadClick}
                            setModalStatus={setViewModal}
                            images={dynamicCicRows[indexPics]?.picList || []}
                        />
                    }
                    modalStatus={viewModal}
                    setModalStatus={setViewModal}
                />
                <Modal
                    maxWidth={'sm'}
                    title="Add Files"
                    content={
                        <FileUploader
                            setIndex={indexPics}
                            handleUpdate={onUploadFileClick}
                            setModalStatus={setViewFileModal}
                            files={dynamicCicRows[0]?.recFiles || []}
                        />
                    }
                    modalStatus={viewFileModal}
                    setModalStatus={setViewFileModal}
                />
            </Grid>
        </div>
    );
};

export default SharedRejectionReason;
