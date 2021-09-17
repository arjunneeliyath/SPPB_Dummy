import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../../constants/theme';

export const useStyles = makeStyles(
    {
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
        rowContainer: {},
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
            color: theme.palette.text.primary,
            display: 'flex',
            marginTop: 15,
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
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
        textareaField: {
            width: '100%',
            border: 'solid',
            borderWidth: 'thin',
            borderRadius: '5px',
            borderColor: '#B1B1B1',
            fontSize: '15px',
            marginBottom: 15,
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
        linkText: {
            textAlign: 'right',
            fontWeight: 600,
            margin: '10px 0',
        },
        formLabel: {
            fontWeight: 600,
            fontSize: '14px',
            color: '#2C2A29',
        },
        boxPadding: {
            padding: '8px 0',
        },
    },
    { index: 1 }
);
