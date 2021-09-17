import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    (theme) => ({
        boxStyle: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
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
        rowContainer: {
            padding: '2%',
        },
        iconCell: {
            color: '#00529F',
            cursor: 'pointer',
            display: 'block',
            maxWidth: '40ch',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            paddingLeft: 8,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            background: '#FFFFFF',
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
        listComponent: {
            margin: 0,
            padding: '0',
        },
        addButton: {
            marginTop: 10,
            color: 'white',
            backgroundColor: '#00529F',
            textTransform: 'none',
        },
        nameField: {
            width: '400px',
            top: '321px',
            [theme.breakpoints.down('sm')]: {
                width: '280px',
            },
            [theme.breakpoints.down('xs')]: {
                width: '240px',
            },
        },
        textField: {
            width: '400px',
            [theme.breakpoints.down('sm')]: {
                width: '280px',
            },
            [theme.breakpoints.down('xs')]: {
                width: '240px',
            },
        },
        textareaField: {
            width: '100%',
            border: 'solid',
            borderWidth: 'thin',
            borderRadius: '5px',
            borderColor: '#B1B1B1',
            marginTop: '10px',
            marginBottom: '10px',
        },
        valueSetGridField: {
            marginTop: '20px',
        },
        valueSetField: {
            marginBottom: '10px',
            top: '20px',
            color: '#00529F',
            font: 'normal normal bold 18px/24px Nunito Sans',
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
        buttonItem: {
            marginTop: 10,
        },
        buttonCreateItem: {
            marginRight: '10px',
        },
        buttonUpdateItem: {
            marginRight: '-120px',
        },
        buttonGrid: {
            height: '48px',
        },
        buttonContainer: {
            marginTop: '25px',
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
        buttonCancelItem: {
            marginRight: '70px',
        },
        buttonResetItem: {
            color: '#00529F',
            borderColor: '#00529F',
            marginRight: 25,
        },
        buttonaEditResetItem: {
            color: '#00529F',
            borderColor: '#00529F',
            marginRight: '-130px',
        },
    }),
    { index: 1 }
);
