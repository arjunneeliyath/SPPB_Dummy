import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    () => ({
        root: {
            height: 138,
            boxShadow: '0px 3px 6px #00000055',
            background: '#FFFFFF',
            borderRadius: 6,
            opacity: 1,
        },
        bullet: {
            display: 'inline-block',
        },
        title: {
            textAlign: 'center',
            marginTop: 18,
            marginLeft: 1,
        },
        image: {
            textAlign: 'center',
            height: 51,
        },
        topcontainer: {
            marginTop: 107,
            height: 945,
            background: '#F6F6F6 0% 0% no-repeat padding-box',
            opacity: 1,
        },
        subheading: {
            left: 140,
            width: 450,
            height: 24,
            textAlign: 'left',
            fontWeight: 600,
            marginTop: 24,
            marginLeft: 30,
            fontFamily: 'Nunito Sans',
            fontSize: 'bold 2px/4px',
            color: 'black',
            opacity: 1,
        },
        pos: {
            marginBottom: 12,
        },
    }),
    { index: 1 }
);
