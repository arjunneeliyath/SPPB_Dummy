import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../constants/theme';

export const useStyles = makeStyles(
    {
        boxStyle: {
            background: '#FFFFFF',
        },
        messageField: {
            marginBottom: '10px',
            top: '20px',
            color: 'black',
            font: 'normal normal bold 18px/24px Nunito Sans',
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '12px',
        },
        buttonExport: {
            color: '#ffffff',
            borderColor: '#00529F',
            margin: '20px 0 20px 20px',
            textTransform: 'capitalize',
            fontWeight: 600,
            float: 'right',
        },
        seperator: {
            height: 20,
            background: '#F6F6F6',
        },
        heading: {
            fontSize: '18px',
            margin: '15px 0px 15px 0px',
        },
        form: {
            width: '100%',
            overflow: 'hidden',
        },
        rowContainer: {
            padding: '2%',
        },
        align: {},
        buttonItem: {},
        buttonSubmit: {
            textTransform: 'capitalize',
            fontWeight: 600,
            borderRadius: '5px',
            margin: '20px 0 20px 20px',
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
        gobutton: {
            textTransform: 'capitalize',
            fontWeight: 600,
            borderRadius: '5px',
            margin: '20px 0 20px 0',
        },
        button: {
            color: '#00529F',
            borderColor: '#00529F',
            margin: '20px 0 20px 20px',
            textTransform: 'capitalize',
            fontWeight: 600,
        },
        datePicker2: {
            height: '40px',
            width: '100%',
            margin: '10px 0px 10px 0px',
            '& .MuiInputBase-input': {
                fontSize: 14,
                paddingLeft: 7,
                padding: '8px 5px',
                fontWeight: 600,
            },
            '& .MuiInputAdornment-root': {
                height: '26px',
            },
            '& .MuiInputBase-root': {
                padding: 0,
                height: '40px',
            },
            '& .MuiSvgIcon-root': {
                width: 20,
            },
        },
        autocompleteselectbox: {
            boxSizing: 'border-box',
            '& ul': {
                padding: 0,
                margin: 0,
            },
            '& .MuiInputBase-root': {
                paddingRight: 25,
                margin: '10px 0px 10px 0px',
                height: 40,
                paddingTop: '0 !important',
                paddingBottom: '0 !important',
            },
            '& .MuiInputBase-input': {
                padding: '0px 4px',
            },
        },
        passColor: {
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
            color: 'green',
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
            fontWeight: 'bold',
        },
        selectField: {
            height: '40px',
            width: '100%',
            margin: '10px 0px 10px 0px',
            '& .MuiPaper-root': {
                marginTop: '60px',
            },
            '& .MuiSelect-select': {
                padding: '10px 26px 10px 12px',
                backgroundColor: theme.palette.background.default,
            },
            '& .MuiSelect-select:not([multiple]) option': {
                backgroundColor: theme.palette.background.default,
            },
        },
        checkbox: {
            padding: 5,
        },
        nameTextField: {
            width: '90px',
        },
        selectbox: {
            '& .MuiSelect-root': {
                padding: '11px 14px !important',
                width: 40,
            },
        },
        option: {
            backgroundColor: 'white',
        },
        iconCell: {
            color: '#00529F',
            cursor: 'pointer',
        },
        radioField: {
            color: theme.palette.text.primary,
            fontSize: '14px',
        },
        style3: {
            background: '#ececec',
        },
        labelFieldDisplay3: {
            color: '#2C2A29',
            fontSize: 17,
            fontWeight: 600,
        },
        topBoxStyle: {
            background: 'rgba(246, 246, 246, 0.2)',
            borderBottom: '1px solid rgba(112, 112, 112, 0.2)',
            padding: 10,
            margin: '0 !important',
        },
        labelField3: {
            color: '#00529f',
            fontSize: 12,
            fontWeight: 'bold',
            wordBreak: 'break-all',
        },
        paddingTop: {
            paddingTop: 10,
            [theme.breakpoints.down('sm')]: {
                paddingTop: 0,
            },
            [theme.breakpoints.down('xs')]: {
                paddingTop: 0,
            },
        },
        astrisk: {
            color: 'red',
        },
        padding: {
            padding: 20,
        },
        gridContainer: {
            background: '#FFFFFF',
            flexGrow: 1,
        },
        urlabelField: {
            color: theme.palette.text.primary,
        },
        urftextareaField: {
            width: '100%',
            borderRadius: '5px',
            fontSize: '15px',
            height: 220,
            margin: '10px 0px 10px 0px',
            '& div.MuiInputBase-root': {
                padding: '11px 14px',
                height: 220,
                '& .MuiOutlinedInput-input': {
                    padding: '11px 14px',
                    height: '100% !important',
                },
            },
        },
        textarea: {
            width: '90%',
            '& .MuiInputBase-input': {
                fontWeight: 600,
            },
        },
        errorLink: {
            color: 'red',
            paddingLeft: 15,
            cursor: 'pointer',
        },
    },
    { index: 1 }
);
