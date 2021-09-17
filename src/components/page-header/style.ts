import { makeStyles } from '@material-ui/core';

export const gridContainer = makeStyles(
    (theme) => ({
        root: {
            padding: '30px 0px 30px 0px',
        },
        name: {
            fontSize: '23px',
            color: theme.palette.primary.main,
        },
        grid: {
            padding: '7px',
        },
        supportHelp: {
            color: theme.palette.primary.main,
            marginTop: '-30px',
            marginLeft: '40px',
        },
        iconImage: {
            width: '32px',
            height: '24px',
        },
    }),
    { index: 1 }
);
