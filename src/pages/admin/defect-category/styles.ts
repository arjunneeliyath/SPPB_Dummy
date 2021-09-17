import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../constants/theme';

export const useStyles = makeStyles(
    {
        boxStyle: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
        },
        inputField: {
            margin: '0px 0px 0px 0px',
            width: '100%',
            border: 'solid',
            height: '40px',
            borderWidth: 'thin',
            borderRadius: '5px',
            borderColor: '#B1B1B1',
            padding: '10px 26px 10px 12px',
            marginTop: '10px',
            marginBottom: '10px',
        },
        rowContainer: {
            padding: '2%',
        },
        iconCell: {
            color: '#00529F',
            cursor: 'pointer',
            display: 'block',
            maxWidth: '70ch',
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
            paddingLeft: '0px',
        },
        linkField: {
            marginTop: 10,
            marginBottom: 10,
        },
        labelField: {
            marginBottom: '10px',
            color: theme.palette.text.primary,
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
        defectGridField: {
            marginTop: '20px',
        },
        defectListField: {
            marginBottom: '10px',
            top: '20px',
            color: '#00529F',
            font: 'normal normal bold 18px/24px Nunito Sans',
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
        buttonContainer: {
            marginTop: '25px',
        },
        buttonItem: {
            marginTop: 10,
        },
        buttonCreateItem: {
            marginRight: '10px',
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
        buttonGrid: {
            height: '48px',
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
        buttonResetItem: {
            marginRight: '10px',
        },
        buttonCancelItem: {
            marginRight: '70px',
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
        textareaField: {
            width: '100%',
            border: 'solid',
            borderWidth: 'thin',
            borderRadius: '5px',
            borderColor: '#B1B1B1',
            marginTop: '10px',
            marginBottom: '10px',
        },
        attrRecord: {
            marginTop: 1,
            margin: 0,
            padding: 0,
            height: 3,
        },
        itemType: {
            margin: 0,
            padding: 0,
            height: 1,
        },
        addButton: {
            marginTop: 10,
            width: '122px',
            color: 'white',
            backgroundColor: '#00529F',
            textTransform: 'none',
        },
        addModalButton: {
            marginTop: 10,
            color: 'white',
            backgroundColor: '#00529F',
            textTransform: 'none',
        },
        footerButton: {
            float: 'left',
            marginRight: '23px',
        },
        footerButtonsWrapper: {
            marginTop: '12px',
            marginBottom: '12px',
            paddingLeft: '23px',
        },
    },
    { index: 1 }
);
