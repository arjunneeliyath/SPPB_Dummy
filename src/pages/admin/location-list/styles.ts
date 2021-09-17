import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    {
        boxStyle: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
        },
        heading: {
            fontSize: '18px',
            margin: '15px 0px 15px 0px',
        },
        inputField: {
            margin: '10px 0px 10px 0px',
            width: '100%',
            border: 'solid',
            height: '40px',
            borderWidth: 'thin',
            borderRadius: '5px',
            borderColor: '#B1B1B1',
            padding: '10px 26px 10px 12px',
            fontSize: '15px',
        },
        textareaField: {
            width: '100%',
            border: 'solid',
            borderWidth: 'thin',
            borderRadius: '5px',
            borderColor: '#B1B1B1',
            fontSize: '15px',
        },
        rowContainer: {
            padding: '2%',
        },
        rowHeader: {
            marginBottom: '20px',
        },
        rowHeaderNoContent: {
            marginTop: '40px',
        },
        buttonContainer: {
            marginTop: '10px',
        },
        buttonItem: {
            marginRight: '10px',
        },
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
        iconCell: {
            color: '#00529F',
            cursor: 'pointer',
        },
        formContainer: {
            padding: '0px 0px 0px 3px',
        },
        tableCell: {
            paddingLeft: 8,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            background: '#FFFFFF',
            color: '#2C2A29',
            display: 'block',
            maxWidth: '70ch',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        gridContainer: {
            background: '#FFFFFF',
        },
        addButton: {
            marginTop: 10,
            color: 'white',
            backgroundColor: '#00529F',
            textTransform: 'none',
        },
    },
    { index: 1 }
);
