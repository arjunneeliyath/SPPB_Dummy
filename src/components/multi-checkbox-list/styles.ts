import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    (theme) => ({
        container: {
            marginTop: 10,
            background: '#fff',
            border: '1px solid #d6d6d6',
        },
        root: {
            margin: 'auto',
        },
        cardHeader: {
            padding: '4px 16px',
            '& .MuiCheckbox-root': {
                padding: '4px !important',
            },
        },
        list: {
            width: '100%',
            height: 175,
            backgroundColor: '#fff',
            overflow: 'auto',
            paddingTop: 2,
            paddingBottom: 2,
            '& .MuiListItemIcon-root': {
                minWidth: '50px !important',
            },
        },
        button: {
            margin: theme.spacing(0.5, 0),
        },
        labelField: {
            color: theme.palette.text.primary,
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
    }),
    { index: 1 }
);
export default useStyles;
