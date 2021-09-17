import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    autocompleteselectbox: {
        boxSizing: 'border-box',
        width: 300,
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});
