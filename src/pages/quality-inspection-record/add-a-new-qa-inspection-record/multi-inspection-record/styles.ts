import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../../constants/theme';

export const useStyles = makeStyles(
    {
        boxStyle: {
            background: '#FFFFFF',
        },
        buttonSubmit: {
            textTransform: 'capitalize',
            fontWeight: 600,
            borderRadius: '5px',
            margin: '20px 0 20px 20px',
        },
        button: {
            color: '#00529F',
            borderColor: '#00529F',
            margin: '20px 0 20px 20px',
            textTransform: 'capitalize',
            fontWeight: 600,
        },
        labelField: {
            color: theme.palette.text.primary,
            fontSize: '15px',
            marginLeft: '15px',
        },
        nameTextField: {
            width: '90px',
        },
        selectbox: {
            '& .MuiOutlinedInput-input': {
                padding: '11px 14px !important',
            },
        },
        option: {
            backgroundColor: 'white',
        },
        selectField: {
            height: '40px',
            width: '200px',
        },
        selectRecBrand: {
            height: '40px',
            width: '90px',
        },
        timeField: {
            height: '-10px',
            width: '100px',
        },
        iconCell: {
            color: '#00529F',
            cursor: 'pointer',
        },
        padLeft: {
            paddingLeft: 20,
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
        passColor: {
            paddingLeft: 8,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            background: '#FFFFFF',
            color: 'green',
            display: 'block',
            maxWidth: '70ch',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
        },
        failColor: {
            paddingLeft: 8,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            background: '#FFFFFF',
            display: 'block',
            maxWidth: '70ch',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: 'red',
        },
        required: {
            color: 'red',
            paddingLeft: 15,
        },
        errorLink: {
            color: 'red',
            paddingLeft: 15,
            cursor: 'pointer',
        },
        gridContainer: {
            background: '#FFFFFF',
            flexGrow: 1,
        },
        fail: {
            color: 'red',
        },
    },
    { index: 1 }
);
