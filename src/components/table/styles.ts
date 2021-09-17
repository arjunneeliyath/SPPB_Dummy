import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(
    () => ({
        root: {
            marginLeft: '2%',
            width: '96%',
            marginTop: 0,
            boxShadow: 'none',
            OverflowX: 'auto',
            minWidth: '650px',
        },
        container: {
            maxHeight: 344,
            overflowX: 'auto',
            width: '100%',
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
            marginTop: 15,
            fontSize: 'bold',
            color: '#00529F',
            borderRadius: '5px',
            textTransform: 'none',
            marginLeft: 21,
            backgroundColor: 'white',
            marginBottom: 10,
            height: '32px',
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
            position: 'sticky',
            top: 0,
            zIndex: 1,
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
            padding: '0px 0px 15px 22px',
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
        padding: {
            padding: 15,
        },
        stickyTable: {
            borderCollapse: 'separate',
        },
        stickyColumn: {
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            paddingLeft: 7,
            paddingTop: 4,
            paddingBottom: 4,
            paddingRight: 0,
            background: '#FFFFFF',
            fontWeight: 'bold',
            color: '#2C2A29',
            position: 'sticky',
            left: 0,
        },
    }),
    { index: 1 }
);
export default useStyles;
