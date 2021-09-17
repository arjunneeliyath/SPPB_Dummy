import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(
    (theme) => ({
        header: {
            width: '100%',
            display: 'flex',
            background: '#ffffff',
            '@media (max-width:959px)': {
                padding: '0 15px',
                height: '100%',
            },
        },
        logoContainer: {
            textAlign: 'center',
            width: 150,
            marginTop: '25px',
            cursor: 'pointer',
        },
        logoHeaderContainer: {
            textAlign: 'center',
        },
        logoSubTitle2: {
            marginTop: '-0.7rem',
            font: 'normal normal bold 16px/22px Nunito Sans',
            letterSpacing: '0px',
            color: '#00529F',
            fontSize: '0.6rem',
        },
        logoSubTitle1: {
            font: 'normal normal bold 16px/22px Nunito Sans',
            letterSpacing: '0px',
            color: '#00529F',
            fontSize: '0.6rem',
        },
        tabs: {
            height: 70,
            marginTop: '23px',
            '& div.MuiTabs-scroller': {
                '& .MuiTabs-flexContainer': {
                    justifyContent: 'center',
                },
            },
        },
        avatar: {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            marginTop: '25px',
            cursor: 'pointer',
        },
        username: {
            marginLeft: '45px',
            marginTop: '-41px',
            font: 'normal normal bold 12px/14px Nunito Sans',
        },
        role: {
            marginLeft: '45px',
            marginTop: '2px',
            font: 'normal normal bold 12px/14px Nunito Sans',
        },
        menuWrapper: {
            marginTop: theme.spacing(6),
        },
        mobileDrawIcon: {
            padding: '26px 10px',
        },
        drawerPaper: {
            width: 250,
        },
        liststyle: {
            width: '100%',
            backgroundColor: '#ffffff',
        },
        listitems: {
            padding: theme.spacing(1),
        },
        link: {
            color: theme.palette.text.primary,
            textDecoration: 'none',
            textTransform: 'none',
            width: '112px',
        },
        linkSelected: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
            textUnderlineOffset: '5px',
        },
        tab: {
            textTransform: 'none',
            minWidth: theme.spacing(10),
            width: theme.spacing(14),
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            marginTop: '15px',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        notify: {
            marginTop: 30,
            marginLeft: 10,
            width: 30,
            minHeight: 20,
            cursor: 'pointer',
            '@media (max-width:600px)': {
                width: 22,
                marginTop: 32,
            },
        },
    }),
    { index: 1 }
);
