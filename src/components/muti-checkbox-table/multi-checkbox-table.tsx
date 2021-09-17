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
    Checkbox,
} from '@material-ui/core';
interface ITableProps {
    header: any;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, y: string, index: number) => void;
    data: any;
    addButton?: ReactChild;
    renderBackButton?: boolean;
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, x: string, index: number) => void;
    handleCheckboxClick: (e: React.ChangeEvent<HTMLInputElement>, y: string, index: number) => void;
    disable?: boolean;
    fromCC?: boolean;
    onBlur: () => void;
}

const row = (
    x: any,
    i: number,
    header: any,
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, y: string, index: number) => void,
    classes: any,
    handleCheckboxClick: (e: React.ChangeEvent<HTMLInputElement>, y: string, index: number) => void,
    onBlur: () => void,
    disable?: boolean,
    fromCC?: boolean
) => {
    return (
        <TableRow>
            {header?.map((y: any, k: number) => {
                const labelId = `enhanced-table-checkbox-${k}`;
                const safewayError = y.prop === 'emailAddress' && !x.isSafewayMail && x.doValidate;
                const isInValidMail = y.prop === 'emailAddress' && x[y.prop]?.trim() !== '' && !x.isValidMail;
                const duplicateText =
                    y.checkDuplicate &&
                    (y.prop === 'name' ? x.isNameDuplicate : y.prop === 'emailAddress' ? x.isMailDuplicate : false);
                const error =
                    (!x.doRemove ? x[y.prop]?.toString()?.trim() === '' || safewayError : false) ||
                    isInValidMail ||
                    (y.checkDuplicate && y.prop === 'name'
                        ? !x.doRemove && x.isNameDuplicate
                        : y.prop === 'emailAddress'
                        ? !x.doRemove && x.isMailDuplicate
                        : false);
                const helperText =
                    safewayError && !x.doRemove
                        ? 'Safeway address expected'
                        : duplicateText
                        ? 'Duplicate ' + y.name
                        : isInValidMail
                        ? 'Valid mail address expected'
                        : '';
                return y.prop === 'name' || y.prop === 'emailAddress' ? (
                    <TableCell className={!fromCC ? classes.tableCell : classes.tableCellCC} key={`trc-${k}`}>
                        <TextField
                            error={error}
                            name={y.prop}
                            onChange={(event) => handleChange(event, y.prop, i)}
                            value={x[y.prop]}
                            variant="outlined"
                            size="small"
                            disabled={x.doRemove || disable}
                            type={!x.doRemove ? y.type : undefined}
                            helperText={helperText}
                            className={y.prop === 'emailAddress' ? classes.emailBox : null}
                            autoComplete="new-password"
                            onBlur={onBlur}
                        />
                    </TableCell>
                ) : (
                    <TableCell className={classes.gridContainer} key={`trc-${k}`}>
                        <Checkbox
                            checked={Boolean(x[y.prop])}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onChange={(e) => handleCheckboxClick(e, y.prop, i)}
                            value={x[y.prop]}
                            color="primary"
                            disabled={y.prop === 'doValidate' && x.doRemove}
                        />
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

const MultiCheckboxTable = (props: ITableProps) => {
    const {
        data,
        header,
        handleChange,
        addButton,
        renderBackButton,
        handleSelectAllClick,
        handleCheckboxClick,
        disable,
        fromCC,
        onBlur,
    } = props;
    const classes = useStyles();
    const history = useHistory();
    const rowCount: number = data.length;

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
            <Grid item xs={12}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {header?.map((x: any, i: number) => {
                                        const numSelected = data.filter((y: any) => y[x.prop]).length;
                                        return (
                                            <>
                                                {x.prop === 'name' || x.prop == 'emailAddress' ? (
                                                    <TableCell
                                                        className={
                                                            !fromCC ? classes.titleContainer : classes.titleContainerCC
                                                        }
                                                        key={`thc-${i}`}
                                                    >
                                                        {x.name}
                                                        {x.isRequired ? (
                                                            <span className={classes.astrisk}> *</span>
                                                        ) : null}
                                                    </TableCell>
                                                ) : (
                                                    <TableCell
                                                        className={
                                                            !fromCC
                                                                ? classes.titleContainer
                                                                : x.prop === 'doValidate'
                                                                ? classes.validateCell
                                                                : classes.titleContainerCheck
                                                        }
                                                        key={`trc-${i}`}
                                                    >
                                                        <Checkbox
                                                            indeterminate={numSelected > 0 && numSelected < rowCount}
                                                            checked={rowCount > 0 && numSelected === rowCount}
                                                            onChange={(e) => handleSelectAllClick(e, x, i)}
                                                            inputProps={{ 'aria-label': 'Select all' }}
                                                            color="primary"
                                                            disabled={
                                                                x.prop === 'doValidate' &&
                                                                data.every((x: any) => x.doRemove)
                                                            }
                                                        />
                                                        {x.name}
                                                    </TableCell>
                                                )}
                                            </>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((x: any, i: number) =>
                                    row(
                                        x,
                                        i,
                                        header,
                                        handleChange,
                                        classes,
                                        handleCheckboxClick,
                                        onBlur,
                                        disable,
                                        fromCC
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
export default MultiCheckboxTable;
