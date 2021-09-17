import { makeStyles } from '@material-ui/core/styles';
import theme from '../../constants/theme';

export const useStyles = makeStyles(
    {
        selectAllText: {
            fontWeight: 500,
        },
        margin: {
            margin: theme.spacing(1),
        },
        selectedAll: {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
        selected: {
            '& .Mui-selected': {
                background: '#00529f',
                color: '#fff',
            },
            '& .Mui-selected:hover': {
                background: '#05a2e3',
            },
        },
    },
    { index: 1 }
);
