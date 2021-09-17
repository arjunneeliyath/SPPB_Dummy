import React from 'react';
import useStyles from './styles';
import {
    Button,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    Grid,
    TableCell,
    TableRow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
interface ITableProps {
    addButton?: React.ReactChild;
    renderBackButton?: boolean;
    hidePagination?: boolean;
    rows?: Array<React.ReactNodeArray>;
    titles: Array<React.ReactNode>;
    title?: React.ReactChild;
}

export default function TableComponent({
    rows,
    addButton,
    renderBackButton,
    titles,
    hidePagination,
    title,
}: ITableProps) {
    const [page, setPage] = React.useState(0);
    const [numberOfRecordsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();
    const history = useHistory();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Grid container>
            <Grid item className={classes.formContainer}>
                {addButton}
            </Grid>
            {title}
            <Grid item xs={12} className={classes.padding}>
                <TableContainer className={classes.container}>
                    <Table aria-label="sticky table" className={classes.stickyTable}>
                        <TableHead>
                            <TableRow>
                                {titles.map((title, i) => (
                                    <TableCell key={i} className={classes.titleContainer}>
                                        {title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                ?.slice(
                                    page * numberOfRecordsPerPage,
                                    page * numberOfRecordsPerPage + numberOfRecordsPerPage
                                )
                                .map((row, i) => (
                                    <TableRow key={i}>
                                        {row.map((record, j) => (
                                            <TableCell key={j} className={classes.tableCell}>
                                                {record}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {rows && (
                <Grid container>
                    <Grid item xs={12} sm={2}>
                        {renderBackButton ? (
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => history.goBack()}
                                className={classes.backButton}
                                role="back-btn"
                            >
                                Back
                            </Button>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        {!hidePagination ? (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={numberOfRecordsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                onPageChange={handleChangePage}
                            />
                        ) : null}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
