import React from 'react';
import { TextField, FormLabel, Select, InputBase, Radio, Grid, Checkbox } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useStyles } from './style';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';
import { Typography, Tooltip } from '@material-ui/core';
import { ListboxComponent, renderGroup } from '../autocomplete-select-box/autocomplete-select-box';
export interface ISelectOption {
    id: number;
    name: string;
}
export interface IRadioOptions {
    id: string;
    name: string;
}
export interface ICheckBoxOptions {
    id: string;
    name: string;
}
interface IErrorData {
    errors?: string;
    touched?: boolean;
}

interface IFormProps {
    autoFocus?: boolean;
    value?: string | null;
    placeholder?: string;
    component?: 'input' | 'select' | 'textarea' | 'radio' | 'checkbox' | 'date' | 'autocompleteselectbox';
    id: string;
    className?: string;
    label?: string;
    name: string;
    selectOptions?: ISelectOption[];
    options?: string[] | undefined;
    radioOptions?: IRadioOptions[];
    checkBoxOptions?: ICheckBoxOptions[];
    required?: boolean;
    disabled?: boolean;
    touched?: boolean;
    errors?: string;
    handleChange: (event: React.ChangeEvent<any>) => void;
    onBlur?: (event: React.FocusEvent<any>) => void;
    input?: React.ReactElement;
    defaultValue?: number;
    rows?: number;
    type?: string;
    inputVariant?: 'outlined' | 'filled' | 'standard';
    readOnly?: boolean;
    autoComplete?: string;
    inValid?: boolean;
    setRef?: (data: any) => void;
}

const ErrorMessageComponent = (props: IErrorData) => {
    const classes = useStyles();
    if (props.touched && props.errors) {
        return <div className={classes.errorMessage}>{props.errors}</div>;
    } else {
        return <div>{''}</div>;
    }
};

const InputField = (props: IFormProps) => {
    const classes = useStyles();
    const {
        autoFocus,
        touched,
        errors,
        value,
        placeholder,
        id,
        handleChange,
        onBlur,
        className,
        label,
        required,
        disabled,
        type,
    } = props;

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const irrationalValues = ['e', '+', '-'];
        const { key } = event;
        if (irrationalValues.includes(key) && type === 'number') {
            event.preventDefault();
        }
    };

    return (
        <div>
            <FormLabel htmlFor={id} required={required} className={classes.labelField}>
                {label}
            </FormLabel>
            <br />
            <InputBase
                type={type}
                autoFocus={autoFocus}
                className={className}
                id={id}
                disabled={disabled}
                value={value}
                placeholder={placeholder || ''}
                onChange={handleChange}
                onBlur={onBlur}
                inputProps={{ 'aria-label': 'naked', min: type === 'number' ? 0 : '' }}
                onKeyDown={onKeyDown}
            />
            <br />
            <ErrorMessageComponent errors={errors} touched={touched} />
        </div>
    );
};

const AutoCompleteSelectBox = (props: IFormProps) => {
    const classes = useStyles();
    const { errors, value, id, handleChange, className, label, required, options, placeholder, disabled } = props;

    return (
        <div>
            <FormLabel required={required} className={classes.labelField}>
                {label}
            </FormLabel>
            <br />
            <Autocomplete
                id={id}
                value={value}
                className={className}
                disableListWrap
                classes={classes}
                onChange={handleChange}
                ListboxComponent={ListboxComponent}
                renderGroup={renderGroup}
                options={options || []}
                groupBy={(option) => option[0].toUpperCase()}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder={placeholder} disabled={disabled} />
                )}
                renderOption={(option) => {
                    return (
                        <>
                            <Tooltip title={option} placement="right-end">
                                <Typography noWrap>{option}</Typography>
                            </Tooltip>
                        </>
                    );
                }}
                disabled={disabled}
            />
            <br />
            <ErrorMessageComponent errors={errors} />
        </div>
    );
};

const TextareaField = (props: IFormProps) => {
    const classes = useStyles();
    const {
        label,
        touched,
        errors,
        disabled,
        required,
        handleChange,
        onBlur,
        className,
        placeholder,
        value,
        id,
        rows,
        inValid,
        setRef,
    } = props;
    return (
        <div>
            <FormLabel htmlFor={id} required={required} className={classes.labelField}>
                {label}
            </FormLabel>
            <br />
            <TextField
                disabled={disabled}
                multiline
                rows={rows}
                maxRows={7}
                value={value}
                id={id}
                variant="outlined"
                onChange={handleChange}
                placeholder={placeholder || ''}
                onBlur={onBlur}
                className={className}
                size="small"
                error={inValid}
                inputRef={(ref) => setRef && setRef(ref)}
            />
            <ErrorMessageComponent errors={errors} touched={touched} />
        </div>
    );
};
const RadioField = (props: IFormProps) => {
    const classes = useStyles();
    const { touched, errors, id, className, required, label, handleChange, disabled, radioOptions, value, name } =
        props;
    return (
        <div>
            <FormLabel htmlFor={id} required={required} className={classes.labelField}>
                {label}
            </FormLabel>
            <br />
            <Grid container direction={name === 'inspectionType' ? 'column' : 'row'}>
                {radioOptions?.map((item) => (
                    <div key={`div-key-${item.id}`}>
                        <Radio
                            key={`radio-key-${item.id}`}
                            disabled={disabled}
                            color="primary"
                            id={id}
                            value={item.id}
                            onChange={handleChange}
                            className={className}
                            checked={value === item.id}
                        />
                        <FormLabel className={classes.radioField}>{item.name}</FormLabel>
                    </div>
                ))}
            </Grid>
            <br />
            <ErrorMessageComponent errors={errors} touched={touched} />
        </div>
    );
};
const CheckBoxField = (props: IFormProps) => {
    const classes = useStyles();
    const { touched, errors, id, className, required, label, handleChange, onBlur, disabled, checkBoxOptions, value } =
        props;
    return (
        <div>
            <FormLabel htmlFor={id} required={required} className={classes.labelField}>
                {label}
            </FormLabel>
            <br />
            <Grid container direction="row">
                {checkBoxOptions?.map((item) => (
                    <div key={`${item.name}`}>
                        <Checkbox
                            key={`checkbox-key-${item.name}`}
                            disabled={disabled}
                            color="primary"
                            id={id}
                            onBlur={onBlur}
                            value={item.name}
                            onChange={handleChange}
                            className={className}
                            checked={value?.includes(item.name)}
                        />
                        <FormLabel className={classes.checkBoxField}>{item.name}</FormLabel>
                    </div>
                ))}
            </Grid>
            <br />
            <ErrorMessageComponent errors={errors} touched={touched} />
        </div>
    );
};
const SelectField = (props: IFormProps) => {
    const classes = useStyles();
    const {
        touched,
        value,
        errors,
        selectOptions,
        placeholder,
        className,
        label,
        name,
        input,
        required,
        disabled,
        handleChange,
        onBlur,
        defaultValue,
    } = props;
    return (
        <div>
            <FormLabel required={required} className={classes.labelField}>
                {label}
            </FormLabel>
            <br />
            <Select
                native
                variant="outlined"
                disabled={disabled}
                value={value}
                defaultValue={defaultValue ? defaultValue : placeholder}
                onChange={handleChange}
                name={name}
                onBlur={onBlur}
                className={className}
                input={input}
            >
                <optgroup className={classes.option}>
                    <option key={0} value={placeholder} disabled hidden>
                        {placeholder}
                    </option>
                    {selectOptions &&
                        selectOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </optgroup>
            </Select>
            <br />
            <ErrorMessageComponent errors={errors} touched={touched} />
        </div>
    );
};

const DateField = (props: IFormProps) => {
    const classes = useStyles();
    const {
        errors,
        id,
        className,
        required,
        label,
        handleChange,
        value,
        inputVariant,
        disabled,
        readOnly,
        autoComplete,
        touched,
        placeholder,
    } = props;
    return (
        <div>
            <FormLabel required={required} className={classes.labelField}>
                {label}
            </FormLabel>
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    placeholder={placeholder}
                    disabled={disabled}
                    inputVariant={inputVariant}
                    InputProps={{ readOnly: readOnly }}
                    format="MM-dd-yyyy"
                    value={value}
                    id={id}
                    className={className}
                    onChange={(date: MaterialUiPickersDate) => {
                        const event = {
                            target: {
                                value: date,
                                id: id,
                            },
                        };
                        handleChange(event as any);
                    }}
                    autoComplete={autoComplete}
                />
                <br />
                <ErrorMessageComponent errors={errors} touched={touched} />
            </MuiPickersUtilsProvider>
        </div>
    );
};

const FormComponent = (props: IFormProps) => {
    const { component, selectOptions = [], options = [], radioOptions = [], checkBoxOptions = [], ...rest } = props;
    switch (component) {
        case 'input':
            return InputField({ ...rest });
        case 'select':
            return SelectField({ selectOptions, ...rest });
        case 'textarea':
            return TextareaField({ ...rest });
        case 'radio':
            return RadioField({ radioOptions, ...rest });
        case 'checkbox':
            return CheckBoxField({ checkBoxOptions, ...rest });
        case 'date':
            return DateField({ ...rest });
        case 'autocompleteselectbox':
            return AutoCompleteSelectBox({ options, ...rest });
        default:
            return null;
    }
};
export default FormComponent;
