import React, { ReactChild } from 'react';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TextField,
    Button,
    Paper,
    TableContainer,
    Grid,
    FormLabel,
} from '@material-ui/core';
import { bin } from '../../assets/icons/index';

interface ITableProps {
    header: any;
    handleRemove: (index: number, id: number) => void;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, y: string, index: number) => void;
    data: any;
    onBlur: () => void;
    addButton?: ReactChild;
    renderBackButton?: boolean;
}

const row = (
    x: any,
    i: number,
    header: any,
    handleRemove: (index: number, id: number) => void,
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, y: string, index: number) => void,
    classes: any,
    onBlur: () => void
) => {
    return (
        <TableRow>
            {header?.map((y: any, k: number) => {
                const duplicateText = y.checkDuplicate && y.prop === 'name' ? x.isNameDuplicate : null;
                const helperText = duplicateText ? 'Duplicate Name' : '';
                switch (y.prop) {
                    case 'seq':
                        return (
                            <TableCell className={classes.tableCell} key={`trc-${k}`}>
                                <FormLabel className={classes.labelField}>{i + 1}</FormLabel>
                            </TableCell>
                        );
                    case 'name':
                    case 'description':
                        return (
                            <TableCell className={classes.tableCell} key={`trc-${k}`}>
                                <TextField
                                    error={duplicateText || x[y.prop]?.toString()?.trim() === ''}
                                    name={y.prop}
                                    onChange={(event) => handleChange(event, y.prop, i)}
                                    value={x[y.prop]}
                                    variant="outlined"
                                    size="small"
                                    required
                                    helperText={helperText}
                                    className={y.prop === 'name' ? classes.nameTextField : classes.descriptionTextField}
                                    autoComplete="new-password"
                                    onBlur={onBlur}
                                />
                            </TableCell>
                        );
                    case 'delete':
                        return (
                            <TableCell className={classes.gridContainer} key={`trc-${k}`}>
                                <img
                                    title="Delete"
                                    src={bin}
                                    className={classes.iconCell}
                                    onClick={() => handleRemove(i, x.id)}
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

const EditableTable = ({
    data,
    header,
    handleRemove,
    handleChange,
    addButton,
    renderBackButton,
    onBlur,
}: ITableProps) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Grid container>
            <Grid item className={classes.formContainer}>
                {addButton}
                {renderBackButton ? (
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => history.goBack()}
                        className={classes.backButton}
                    >
                        Back
                    </Button>
                ) : null}
            </Grid>
            <Grid item xs={12} className={classes.fixedHeight}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {header?.map((x: any, i: number) => (
                                        <>
                                            <TableCell className={classes.titleContainer} key={`thc-${i}`}>
                                                {x.name}
                                                {x.isRequired ? <span className={classes.astrisk}> *</span> : null}
                                            </TableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((x: any, i: number) =>
                                    row(x, i, header, handleRemove, handleChange, classes, onBlur)
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default EditableTable;
