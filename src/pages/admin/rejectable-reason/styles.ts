import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    () => ({
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
        buttonContainer: {
            marginTop: '10px',
        },
        formContainer: {
            padding: '0px 0px 15px 22px',
        },
        button: {
            color: '#00529F',
            borderColor: '#00529F',
            marginRight: 15,
            marginTop: 10,
            textTransform: 'capitalize',
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
        iconCell: {
            color: '#00529F',
            cursor: 'pointer',
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
        boxStyle: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
        },
        rowContainer: {
            padding: '2%',
        },
        textCapitaize: {
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
            textTransform: 'capitalize',
        },
    }),
    { index: 1 }
);
