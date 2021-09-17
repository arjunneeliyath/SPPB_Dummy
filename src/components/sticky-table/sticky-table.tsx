import React, { useRef, useEffect, useState } from 'react';
import useStyles from './styles';
import { Table, TableBody, TableContainer, TableHead, Grid, TableCell, TableRow } from '@material-ui/core';
interface ITitles {
    value: string;
    label: string;
    fixed?: boolean;
    wordWrap?: boolean;
    width?: number;
    applyColor?: boolean;
    required?: boolean;
}
interface ITableProps {
    rows?: any[];
    titles: ITitles[];
}

export default function StickyTable({ rows, titles }: ITableProps) {
    const classes = useStyles();
    const tableRef = useRef<any>(null);
    const [forceRerender, setForceRerender] = useState(-1);

    useEffect(() => {
        const stickyColumnCount = titles.filter((column) => column.fixed).length;
        if (rows?.length !== 0 && stickyColumnCount > 0 && forceRerender) {
            for (let i = 0; i < stickyColumnCount; i++) {
                if (i === 0) {
                    titles[i].width = 0;
                } else if (i === 1) {
                    titles[i].width = tableRef?.current?.rows[i]?.cells[i - 1]?.clientWidth;
                } else if (i === 2) {
                    titles[i].width =
                        tableRef?.current?.rows[i - 1]?.cells[i - 2]?.clientWidth +
                        tableRef?.current?.rows[i - 1]?.cells[i - 1]?.clientWidth;
                } else if (i === 3) {
                    titles[i].width =
                        tableRef?.current?.rows[i - 2]?.cells[i - 3]?.clientWidth +
                        tableRef?.current?.rows[i - 2]?.cells[i - 2]?.clientWidth +
                        tableRef?.current?.rows[i - 2]?.cells[i - 1]?.clientWidth;
                }
            }
            setForceRerender(Date.now());
        }
    }, [rows]);

    return (
        <Grid container>
            <Grid item xs={12} className={classes.padding}>
                <TableContainer className={classes.container}>
                    <Table id="rowId" className={classes.table} ref={tableRef}>
                        <TableHead>
                            <TableRow>
                                {titles?.map((title, i) => (
                                    <TableCell
                                        key={i}
                                        className={title.fixed ? classes.titleContainerNew : classes.titleContainer}
                                        style={{ left: title.width }}
                                    >
                                        <div key={`key-${i}`}>
                                            {title.label}
                                            {title.required ? <span className={classes.astrisk}> *</span> : null}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row, i) => (
                                <TableRow key={i}>
                                    {titles?.map((title, j) => (
                                        <TableCell
                                            key={j}
                                            className={title.fixed ? classes.stickyColumn : classes.tableCell}
                                            style={{ left: title.width }}
                                        >
                                            <div
                                                key={`${title.value}-${j}`}
                                                title={(row as any)[title.value]}
                                                className={title.applyColor ? row.color : classes.tableDivCell}
                                                style={{ whiteSpace: title.wordWrap ? 'break-spaces' : 'nowrap' }}
                                            >
                                                {(row as any)[title.value]}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
