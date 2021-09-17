import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../constants/theme';

export const useStyles = makeStyles(
    {
        boxStyle: {
            background: '#FFFFFF',
        },
        seperator: {
            height: 20,
            background: '#F6F6F6',
        },
        heading: {
            fontSize: '18px',
            margin: '15px 0px 15px 0px',
        },
        errorLink: {
            color: 'red',
            paddingLeft: 15,
            cursor: 'pointer',
        },
        form: {
            width: '100%',
            overflow: 'hidden',
        },
        padding: {
            padding: 20,
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
            borderRadius: '5px',
            fontSize: '15px',
            margin: '10px 0px 10px 0px',
            '& div.MuiInputBase-root': {
                '& .MuiOutlinedInput-input': {
                    padding: '11px 14px',
                },
            },
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
        buttonItem: {},
        buttonSubmit: {
            textTransform: 'capitalize',
            fontWeight: 600,
            borderRadius: '5px',
            margin: '20px 0 20px 20px',
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
            flexGrow: 1,
        },
        addButton: {
            marginTop: 10,
            color: 'white',
            backgroundColor: '#00529F',
            textTransform: 'none',
        },
        nameTextField: {
            width: '90px',
        },
        checkboxField: {
            marginLeft: '7px',
        },
        labelField: {
            color: theme.palette.text.primary,
            fontSize: 12,
            fontWeight: 'bold',
            wordBreak: 'break-all',
        },
        labelField2: {
            color: '#00529f',
            fontSize: 12,
            fontWeight: 'bold',
            wordBreak: 'break-all',
        },
        labelField3: {
            color: '#00529f',
            fontSize: 12,
            fontWeight: 'bold',
            wordBreak: 'break-all',
        },
        urlabelField: {
            color: theme.palette.text.primary,
        },
        labelFieldDisplay: {
            fontSize: 12,
            textAlign: 'left',
            font: 'normal normal normal Nunito Sans',
            letterSpacing: '0px',
            color: '#2C2A29',
            marginTop: 'auto',
        },
        labelFieldDisplay2: {
            fontSize: 12,
            textAlign: 'left',
            font: 'normal normal normal Nunito Sans',
            letterSpacing: '0px',
            color: '#2C2A29',
            marginTop: 'auto',
            textTransform: 'capitalize',
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
        topLabel: {
            marginTop: '30px',
        },
        labelFieldInspectionType: {
            color: theme.palette.text.primary,
            marginLeft: 25,
            marginTop: 15,
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
        radioButton: {
            font: 'normal normal normal 12px Nunito Sans',
        },
        radioField: {
            color: theme.palette.text.primary,
            fontSize: '14px',
        },
        dropDown: {
            color: 'red',
        },
        qaInspectionGridField: {},
        qaInspectionListField: {
            marginBottom: '10px',
            top: '20px',
            color: 'black',
            font: 'normal normal bold 18px/24px Nunito Sans',
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '12px',
        },
        poField: {
            top: '321px',
            [theme.breakpoints.down('sm')]: {
                width: '280px',
            },
            [theme.breakpoints.down('xs')]: {
                width: '240px',
            },
        },
        buttonGo: {
            color: '#ffff',
            borderColor: '#00529F',
            marginRight: 15,
            marginTop: 10,
            textTransform: 'capitalize',
            fontSize: 'bold',
        },
        selectField: {
            height: '40px',
            boxShadow: '0px 3px 6px #00000029',
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
        option: {
            backgroundColor: 'white',
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
        selectbox: {
            '& .MuiSelect-root': {
                padding: '11px 14px !important',
                width: 40,
            },
        },
        align: {
            alignItems: 'center',
        },
        or: {
            textAlign: 'center',
            paddingTop: 20,
        },
        textColorPass: {
            color: 'green',
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
        helperTextStyle: {
            fontWeight: 'bold',
            color: 'red',
            fontSize: '8px',
            marginRight: '-30px',
            width: '130px',
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
        datePicker: {
            padding: 0,
            width: '80%',
            '& .MuiInputBase-input': {
                padding: 0,
                fontSize: 'small',
                paddingLeft: 7,
            },
            '& .MuiInputAdornment-root': {
                height: '26px',
            },
            '& .MuiInputBase-root': {
                padding: 0,
            },
            '& .MuiSvgIcon-root': {
                width: 20,
            },
        },
        datePicker2: {
            width: '80%',
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
            },
            '& .MuiSvgIcon-root': {
                width: 20,
            },
        },
        style2: {
            background: '#eaeaea',
        },
        style3: {
            background: '#ececec',
        },
        textarea: {
            width: '90%',
            '& .MuiInputBase-input': {
                fontWeight: 600,
            },
        },
        required: {
            color: 'red',
            paddingLeft: 15,
        },
        astrisk: {
            color: 'red',
        },
    },
    { index: 1 }
);
