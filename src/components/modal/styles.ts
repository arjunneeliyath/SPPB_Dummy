import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(
    (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main,
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(0),
        },
        button: {
            fontWeight: 'bold',
        },
        dialogActions: {
            margin: 0,
            padding: theme.spacing(1),
        },
        dialogContent: {
            padding: theme.spacing(2),
        },
        dialogTitle: {
            padding: theme.spacing(1),
            color: theme.palette.secondary.light,
        },
        content: {
            paddingLeft: '16px',
        },
        title: {
            paddingLeft: '16px',
        },
        shape: {
            borderRadius: theme.spacing(0),
            background: '#FFFFFF',
        },
    }),
    { index: 1 }
);
