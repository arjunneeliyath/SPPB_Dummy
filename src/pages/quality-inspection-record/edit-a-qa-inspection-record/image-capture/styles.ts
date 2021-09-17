import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../../constants/theme';

export const useStyles = makeStyles(
    {
        buttonContainer: {
            marginBottom: '10px',
        },
        buttonItem: {
            marginRight: '10px',
        },
        buttonGrid: {},
        buttonSubmit: {
            backgroundColor: '#00529F',
            color: 'white',
            marginRight: 15,
            marginTop: 10,
            textTransform: 'capitalize',
        },
        button: {
            color: '#00529F',
            borderColor: '#00529F',
            marginRight: 15,
            marginTop: 10,
            textTransform: 'capitalize',
        },
        addButton: {
            marginTop: 10,
            color: 'white',
            backgroundColor: '#00529F',
            textTransform: 'none',
        },
        buttonUpload: {
            color: '#00529F',
            borderColor: '#00529F',
            marginRight: 15,
            marginTop: 10,
            textTransform: 'capitalize',
        },
        input: {
            display: 'none',
        },
        labelField: {
            color: theme.palette.text.primary,
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
        imageIcon: {
            marginLeft: '30px',
        },
        buttonCamera: {
            marginLeft: '20px',
            width: 200,
            textTransform: 'capitalize',
        },
        imageDisplay: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            marginTop: '28px',
        },
        imageList: {
            width: '100vw',
            height: '50vh',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.8)',
        },
        uploadButton: {
            marginTop: '10px',
        },
        warningAlert: {
            marginTop: '20px',
        },
        centerAlign: {
            textAlign: 'center',
        },
        leftAlign: {
            textAlign: 'end',
        },
        subHeadText: {
            textAlign: 'center',
            fontWeight: 600,
            color: '#00529F',
        },
    },
    { index: 1 }
);
