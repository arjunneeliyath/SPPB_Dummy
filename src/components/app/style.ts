import { makeStyles } from '@material-ui/core';
import theme from '../../constants/theme';

export const containerStyles = makeStyles(
    {
        root: {},
        pageContent: {
            background: theme.palette.background.paper,
        },
        cardTitle: {},
    },
    { index: 1 }
);
