import { makeStyles } from '@material-ui/core/styles';
import HomeImage from '../../assets/images/QCR-Home-Image.jpg';

export const useStyles = makeStyles(
    (theme) => ({
        box: {
            background: '#ffffff',
            padding: theme.spacing(3),
        },
        heading: {
            marginLeft: '10px',
            font: 'normal normal bold 16px/22px Nunito Sans',
            letterSpacing: '0px',
            color: '#2C2A29',
        },
        errorMessage: {
            color: 'red',
            fontSize: '8px bold',
            marginLeft: '10px',
            marginTop: '0px',
        },
        buttonSubmit: {
            backgroundColor: '#00529F',
            color: 'white',
            marginLeft: '10px',
            textTransform: 'capitalize',
        },
        homeTitle: {
            textAlign: 'center',
            padding: '15px 0',
            background: 'rgba(0,0,0, 0.62)',
            color: '#ffffff',
            letterSpacing: '1.2px',
            fontSize: 'medium',
        },
        homeBg: {
            background: `url(${HomeImage}) no-repeat`,
            backgroundPosition: 'bottom center',
            backgroundSize: 'cover',
            padding: '80px 0px',
            marginBottom: 25,
        },
        title: {
            marginBottom: 15,
            color: '#00529F',
            fontWeight: 'bold',
            fontSize: '16px',
        },
        titlesm: {
            color: '#00529F',
            fontSize: '14px',
            fontWeight: 600,
        },
        poList: {
            background: '#ffffff',
        },
        poTitle: {
            fontSize: '12px',
            fontWeight: 'bold',
            paddingLeft: '5px',
        },
        poText: {
            fontSize: '12px',
            padding: '5px',
        },
        poNumber: {
            color: '#2C2A29',
            fontWeight: 'bold',
            margin: 0,
        },
        noTitle: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#00529F',
        },
        noText: {
            fontSize: '12px',
            paddingTop: '5px',
        },
        poContainer: {
            height: '200px',
            maxHeight: '200px',
            overflowX: 'hidden',
        },
        viewButton: {
            marginTop: 25,
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'capitalize',
        },
        disableText: {
            color: '#a2a3a5',
        },
        normalText: { color: '#00529F' },
        cardInsightsLarge: {
            display: 'flex',
            justifyContent: 'center',
            height: 200,
            flexDirection: 'column',
            background: '#ffffff',
        },
        cardInsightsSmall: {
            display: 'flex',
            justifyContent: 'center',
            height: 92,
            flexDirection: 'column',
            background: '#ffffff',
        },
        bRight: {
            borderRight: '1px solid #e0e0e0',
            [theme.breakpoints.down('sm')]: {
                borderRight: '0px solid #e0e0e0',
            },
        },
        pad15: {
            padding: '15px !important',
        },
    }),
    { index: 1 }
);
