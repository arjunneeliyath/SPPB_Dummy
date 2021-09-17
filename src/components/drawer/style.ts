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
            width: theme.spacing(14),
            font: 'normal normal bold 12px Nunito Sans',
            color: '#000000',
        },
        tabSelected: {
            textTransform: 'none',
            minWidth: theme.spacing(15),
            width: theme.spacing(14),
            font: 'normal normal bold 12px Nunito Sans',
            color: '#00529F',
        },
        liststyle: {
            width: '100%',
            backgroundColor: '#ffffff',
        },
        listitems: {
            padding: theme.spacing(1),
        },
    }),
    { index: 1 }
);
