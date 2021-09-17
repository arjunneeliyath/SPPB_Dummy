import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        typography: {
            textAlign: 'left',
            font: 'normal normal bold 18px/24px Nunito Sans',
            letterSpacing: '0px',
            color: '#00529F',
            opacity: 1,
            fontSize: '15px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
            },
        },
        link: {
            textAlign: 'left',
            letterSpacing: '0px',
            color: '#2C2A29',
            opacity: 1,
            cursor: 'pointer',
            fontSize: '15px',
            '&:hover': {
                color: '#00529F',
                textDecoration: 'underline #000000',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '12px',
            },
        },
    }),
    { index: 1 }
);
