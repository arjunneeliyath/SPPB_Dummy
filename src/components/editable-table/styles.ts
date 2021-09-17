import { makeStyles } from '@material-ui/core/styles';
import theme from '../../constants/theme';
const useStyles = makeStyles(
    () => ({
        root: {
            marginLeft: '0%',
            marginTop: 0,
            padding: 10,
            boxShadow: 'none',
            background: '#fff',
        },
        fixedHeight: {
            overflow: 'auto',
        },
        container: {
            maxHeight: 344,
        },
        nameTextField: {
            width: '190px',
            marginLeft: '10px',
        },
        descriptionTextField: {
            width: '500px',
            marginLeft: '10px',
        },
        tableCell: {
            paddingLeft: 0,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 0,
            background: '#FFFFFF',
            color: '#2C2A29',
        },
        backButton: {
            marginTop: 10,
            fontSize: 'bold',
            color: '#00529F',
            borderRadius: '5px',
            textTransform: 'none',
            marginLeft: 10,
            backgroundColor: 'white',
        },
        titleContainer: {
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            paddingLeft: 11,
            paddingTop: 4,
            paddingBottom: 4,
            fontWeight: 'bold',
            color: '#2C2A29',
        },
        gridContainer: {
            background: '#FFFFFF',
        },
        search: {
            display: 'flex',
            flexDirection: 'column',
        },
        select: {
            marginRight: '30px',
            marginBottom: '22px',
        },
        formContainer: {
            padding: '0px 0px 15px 2px',
            display: 'flex',
            flexDirection: 'row',
        },
        button: {
            marginRight: '5px',
            marginLeft: '2px',
        },
        paginationContainer: {
            flexShrink: 0,
        },
        pagination: {
            display: 'flex',
            marginRight: '30px',
        },
        refreshIcon: {
            width: '17px',
        },
        input: {
            position: 'relative',
            height: '40px',
            border: 'none',
            padding: '10px 18px 10px 18px',
            color: '#2C2A29',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 3px 6px #00000029',
        },
        fabButton: {
            marginLeft: 20,
            backgroundColor: '#FFFFFF',
        },
        required: {
            color: 'red',
            paddingLeft: 15,
        },
        astrisk: {
            color: 'red',
        },
        iconCell: {
            color: '#00529F',
            cursor: 'pointer',
        },
        labelField: {
            color: theme.palette.text.primary,
            fontSize: '15px',
            marginLeft: '15px',
        },
    }),
    { index: 1 }
);
export default useStyles;
