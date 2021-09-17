import React from 'react';
import useStyles from './styles';

import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    TableContainer,
    Grid,
    Select,
    TextField,
    MenuItem,
} from '@material-ui/core';
import { bin } from '../../assets/icons/index';

interface ITitles {
    prop: string;
    name: string;
    value: string;
    isRequired?: boolean;
    checkDuplicate?: boolean;
    componentType?: string;
    required?: boolean;
}
interface ITableProps {
    header: ITitles[];
    data: any[];
    handleRemove: (index: number) => void;
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, y: string, index: number) => void;
    handleSelectChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>, y: string, index: number) => void;
    setFocus: (input: any, index: number, column: string) => void;
    onBlur: () => void;
}

const row = (
    x: any,
    i: number,
    header: ITitles[],
    handleRemove: (index: number) => void,
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, y: string, index: number) => void,
    handleSelectChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>, y: string, index: number) => void,
    classes: any,
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void,
    setFocus: (input: any, index: number, column: string) => void,
    onBlur: () => void
) => {
    return (
        <TableRow>
            {header?.map((y: ITitles, k: number) => {
                switch (y.componentType) {
                    case 'dropdown':
                        return (
                            <TableCell className={classes.tableCell} key={`trc-${k}`}>
                                <Select
                                    id={y.prop}
                                    style={{ width: 150 }}
                                    onChange={(event) => handleSelectChange(event, y.prop, i)}
                                    value={x[y.value]}
                                    name={x[y.value]}
                                    error={x[y.value]?.toString().trim() === '' || x[y.value] === undefined}
                                >
                                    {x[y.prop]?.map((data: any) => {
                                        return (
                                            <MenuItem value={data.id} key={data.id} id={data.id}>
                                                {data.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </TableCell>
                        );

                    case 'textField':
                        return (
                            <TableCell className={classes.tableCell} key={`trc-${k}`}>
                                <TextField
                                    name={y.prop}
                                    value={x[y.prop]}
                                    variant="outlined"
                                    onChange={(event) => handleTextChange(event, y.prop, i)}
                                    size="small"
                                    required
                                    className={classes.nameTextField}
                                    autoComplete="new-password"
                                    type="number"
                                    onKeyDown={onKeyDown}
                                    inputProps={{ min: 0 }}
                                    error={
                                        y.required && (x[y.prop] === undefined || x[y.prop]?.toString().trim() === '')
                                    }
                                    inputRef={(input) => setFocus(input, i, y.prop)}
                                    onBlur={onBlur}
                                />
                            </TableCell>
                        );
                    case 'textArea':
                        return (
                            <TableCell className={classes.tableCell} key={`trc-${k}`}>
                                <TextField
                                    rows={5}
                                    value={x[y.prop]}
                                    variant="outlined"
                                    onChange={(event) => handleTextChange(event, y.prop, i)}
                                />
                            </TableCell>
                        );
                    case 'deleteIcon':
                        return (
                            <TableCell className={classes.gridContainer} key={`trc-${k}`}>
                                <img
                                    title="Delete"
                                    src={bin}
                                    className={classes.iconCell}
                                    onClick={() => handleRemove(i)}
                                />
                            </TableCell>
                        );
                    default:
                        return null;
                }
            })}
        </TableRow>
    );
};
const MultiSelectableEditableTable = ({
    data,
    header,
    handleRemove,
    handleTextChange,
    handleSelectChange,
    setFocus,
    onBlur,
}: ITableProps) => {
    const classes = useStyles();

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const irrationalValues = ['e', '+', '-'];
        const { key } = event;
        if (irrationalValues.includes(key)) {
            event.preventDefault();
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} className={classes.padding}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {header?.map((title: ITitles, i: number) => (
                                        <>
                                            <TableCell className={classes.titleContainer} key={`thc-${i}`}>
                                                {title.name}
                                                {title.required ? <span className={classes.astrisk}> *</span> : null}
                                            </TableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((x: any, i: number) =>
                                    row(
                                        x,
                                        i,
                                        header,
                                        handleRemove,
                                        handleTextChange,
                                        handleSelectChange,
                                        classes,
                                        onKeyDown,
                                        setFocus,
                                        onBlur
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default MultiSelectableEditableTable;
