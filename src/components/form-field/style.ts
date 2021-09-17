import { makeStyles } from '@material-ui/core/styles';
import theme from '../../constants/theme';

export const useStyles = makeStyles(
    {
        errorMessage: {
            color: 'red',
            fontSize: '12px',
        },
        labelField: {
            color: theme.palette.text.primary,
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
        option: {
            backgroundColor: 'white',
        },
        radioField: {
            color: theme.palette.text.primary,
            fontSize: '15px',
        },
        checkBoxField: {
            color: theme.palette.text.primary,
            fontSize: '15px',
        },
    },
    { index: 1 }
);
