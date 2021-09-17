import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(
    (theme) => ({
        link: {
            color: theme.palette.text.primary,
            textDecoration: 'none',
            textTransform: 'none',
        },
        linkSelected: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
            textUnderlineOffset: '5px',
        },
        tab: {
            textTransform: 'none',
            minWidth: theme.spacing(15),
            font: 'normal normal 700 18px Nunito Sans',
            lineHeight: 1.8,
            color: '#000000',
        },
        tabSelected: {
            textTransform: 'none',
            minWidth: theme.spacing(15),
            font: 'normal normal 700 18px Nunito Sans',
            color: '#00529F',
            lineHeight: 1.8,
        },
    }),
    { index: 1 }
);
