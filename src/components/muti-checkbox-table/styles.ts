import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(
    (theme) => ({
        root: {
            marginLeft: '2%',
            width: '96%',
            marginTop: 0,
            boxShadow: 'none',
        },
        container: {
            maxHeight: 344,
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
            paddingLeft: 7,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 0,
            background: '#FFFFFF',
            fontWeight: 'bold',
            color: '#2C2A29',
        },
        gridContainer: {
            background: '#FFFFFF',
            textAlign: 'center',
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
        emailBox: {
            width: 300,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        titleContainerCC: {
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 0,
            background: '#FFFFFF',
            fontWeight: 'bold',
            color: '#2C2A29',
            paddingLeft: 50,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 15,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 5,
            },
        },
        titleContainerCheck: {
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            paddingLeft: 7,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 0,
            background: '#FFFFFF',
            fontWeight: 'bold',
            color: '#2C2A29',
            width: '12%',
            textAlign: 'center',
        },
        tableCellCC: {
            paddingLeft: 50,
            background: '#FFFFFF',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 15,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 5,
            },
        },
        validateCell: {
            width: '50%',
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            paddingLeft: 7,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 0,
            background: '#FFFFFF',
            fontWeight: 'bold',
            color: '#2C2A29',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                width: '12%',
            },
        },
    }),
    { index: 1 }
);
export default useStyles;
