import React from 'react';
import { FormLabel, Grid, Input, Radio, Select, TextField } from '@material-ui/core';
import { useStyles } from '../styles';
import { IDoneWithSelection } from '../../../../interfaces/quality-inspection-record/qa-inspection-record/done-with-selection';
import {
    IDynamicCic,
    IErrorDisplay,
} from '../../../../interfaces/quality-inspection-record/qa-inspection-record/dynamic-cic';
import { camera } from '../../../../assets/icons/index';
import results from '../../../../constants/quality-inspection-record/results';
import MultiSelectDropdown from '../../../../components/multi-select-dropdown/multi-select-dropdown';
import ImageUpload from '../image-capture/image-upload';
import Modal from '../../../../components/modal/modal';
import StickyTable from '../../../../components/sticky-table/sticky-table';

interface IMultipleInspectionTableProps {
    doneWithSelection: IDoneWithSelection;
    errorDisplay: boolean;
    setErrorFocus: (data: IErrorDisplay) => void;
    errorFocus?: IErrorDisplay;
    handleInputChange: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
        value: string,
        attributeId?: number,
        label?: string
    ) => void;
    handleSelectionChange: (
        event: React.ChangeEvent<{ value: unknown }>,
        index: number,
        column: string,
        attributeId?: number,
        label?: string
    ) => void;
    handleRadioChange: (index: number, column: string, id: string, name: string) => void;
    onUploadImagesClick: (values: File[], index: number) => void;
    dynamicCicRows: IDynamicCic[];
    columns: ITitles[];
}
interface ITitles {
    value: string;
    label: string;
    fixed?: boolean;
    dataTypeName?: string;
    attributeValues?: string[];
    wordWrap?: boolean;
    applyColor?: boolean;
    required?: boolean;
    attributeId?: number;
    type?: string;
}

const MultipleInspectionTable = (props: IMultipleInspectionTableProps) => {
    const {
        doneWithSelection,
        handleInputChange,
        handleSelectionChange,
        handleRadioChange,
        onUploadImagesClick,
        dynamicCicRows,
        columns,
        errorDisplay,
        setErrorFocus,
        errorFocus,
    } = props;
    const [viewModal, setViewModal] = React.useState(false);
    const [indexPics, setIndexPics] = React.useState<number>(0);
    const classes = useStyles();

    const openPhotoUploader = (index: any) => {
        setViewModal(true);
        setIndexPics(index);
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

    const addRows = (rows: IDynamicCic[]) => {
        rows?.map((row, index) => {
            columns?.map((column) => {
                const error = errorDisplay
                    ? (column.value === 'shippedQty' && Number(row[`${column.value}Value`]) > row.qtyOrderd) ||
                      (column.value === 'shippedQty' && Number(row[`${column.value}Value`]) === 0) ||
                      (column.value === 'passedQty' &&
                          Number(row[`${column.value}Value`]) >= Number(row.shippedQtyValue)) ||
                      (column.value === 'passedQty' && row[`${column.value}Value`] === '')
                    : false;

                switch (column.dataTypeName) {
                    case 'Text': // Only for dynamic Coloumn
                    case 'Decimal':
                        row[column.value] = (
                            <TextField
                                key={`entry-${column.value}-${index}`}
                                name={'entry'}
                                onChange={(event) =>
                                    handleInputChange(event, index, column.value, column.attributeId, column.label)
                                }
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
                                error={
                                    column.required &&
                                    (row[`Value${column.value}`]?.value === undefined ||
                                        row[`Value${column.value}`]?.value?.trim() === '')
                                }
                                disabled={column.attributeId === 11}
                            />
                        );
                        break;
                    case 'StaticText': // Only for static Column
                        row[column.value] = (
                            <>
                                <TextField
                                    autoFocus={index === 0 && column.value === 'shippedQty'}
                                    inputRef={(input) => setFocus(input, index, column)}
                                    key={`entry-${column.value}-${index}`}
                                    name={'entry'}
                                    onChange={(event) =>
                                        handleInputChange(event, index, column.value, column.attributeId, column.label)
                                    }
                                    value={
                                        row[`${column.value}Value`]?.toString()?.charAt(0) === '.'
                                            ? `0${row[`${column.value}Value`]}`
                                            : row[`${column.value}Value`]
                                    }
                                    variant="outlined"
                                    size="small"
                                    required
                                    className={classes.nameTextField}
                                    title="Please enter a value"
                                    id={column.attributeId?.toString()}
                                    type={column.type || 'number'}
                                    onKeyDown={onKeyDown}
                                    inputProps={{ min: 0, max: 99, step: 1 }}
                                    error={
                                        (column.required &&
                                            (row[`${column.value}Value`] === '' ||
                                                row[`${column.value}Value`] === undefined)) ||
                                        error
                                    }
                                    disabled={row.resultsValue === 'Pass/Fail' ? false : column.value === 'passedQty'}
                                    onBlur={clearFocus}
                                />
                            </>
                        );
                        break;
                    case 'LevelGrade(5)': // Only for Dymanic Coloumns
                    case 'LevelGrade(10)':
                        row[column.value] = (
                            <Select
                                native
                                variant="outlined"
                                title="Please select a value"
                                value={row[`Value${column.value}`]?.value}
                                id={column.attributeId?.toString()}
                                defaultValue={''}
                                onChange={(event) =>
                                    handleSelectionChange(event, index, column.value, column.attributeId, column.label)
                                }
                                name={'select'}
                                input={<Input />}
                                className={classes.selectbox}
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
                    case 'MultiSelect':
                        row[column.value] = (
                            <MultiSelectDropdown
                                data={doneWithSelection.nonRejReasons}
                                placeholder={'Non Rejection Reasons'}
                                displyValue="name"
                                handleChange={(event) => handleSelectionChange(event, index, column.value)}
                                selectedName={row.nonRejValue || []}
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
                    case 'Radio':
                        row[column.value] = results.map((result) => {
                            const value = row[`${column.value}Id`] || '1';
                            return (
                                <div key={`div-key-${result.id}`} title={'Please select a value'}>
                                    <Radio
                                        key={`radio-key-${index}`}
                                        color="primary"
                                        id={result.id}
                                        value={result.id}
                                        onChange={() => handleRadioChange(index, column.value, result.id, result.name)}
                                        checked={value === result.id}
                                        title={result.name}
                                    />
                                    <FormLabel className={classes.radioField}>{result.name}</FormLabel>
                                </div>
                            );
                        });
                }
            });
        });
        return rows?.map((row) => row);
    };

    return (
        <div>
            <Grid container>
                <StickyTable rows={addRows(dynamicCicRows)} titles={columns} />
                <Modal
                    maxWidth={'sm'}
                    title="Add Pictures"
                    content={
                        <ImageUpload
                            setIndex={indexPics}
                            handleUpdate={onUploadImagesClick}
                            setModalStatus={setViewModal}
                            images={dynamicCicRows[indexPics]?.picList || []}
                        />
                    }
                    modalStatus={viewModal}
                    setModalStatus={setViewModal}
                />
            </Grid>
        </div>
    );
};

export default MultipleInspectionTable;
