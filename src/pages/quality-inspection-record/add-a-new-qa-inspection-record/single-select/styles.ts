import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../../constants/theme';

export const useStyles = makeStyles(
    {
        boxStyle: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
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
        input: {
            display: 'none',
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
            fontSize: 11,
            fontWeight: 'bold',
        },
        labelFieldDisplay: {
            fontSize: 11,
            textAlign: 'left',
            font: 'normal normal normal Nunito Sans',
            letterSpacing: '0px',
            color: '#2C2A29',
        },
        topBoxStyle: {
            background: 'rgba(246, 246, 246, 0.2)',
            borderBottom: '1px solid rgba(112, 112, 112, 0.2)',
            padding: 10,
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
        },
        selectField: {
            height: '40px',
            width: '200px',
            '& .MuiOutlinedInput-input': {
                padding: '11px 14px !important',
                backgroundColor: '#fff',
            },
            '& .MuiSelect-select:not([multiple]) option': {
                backgroundColor: '#fff',
            },
        },
        timeField: {
            height: '-10px',
            width: '100px',
        },
        selectRecBrand: {
            height: '40px',
            width: '90px',
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
            backgroundColor: 'white !important',
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
            '& .MuiSelect-outlined': {
                backgroundColor: '#fff',
            },
            '& .MuiSelect-select:not([multiple]) option': {
                backgroundColor: '#fff',
            },
        },
        padLeft: {
            paddingLeft: 20,
        },
        padding: {
            padding: 20,
        },
        returnButton: {
            fontWeight: 600,
        },
        required: {
            color: 'red',
            paddingLeft: 15,
        },
        astrisk: {
            color: 'red',
        },
        errorLink: {
            color: 'red',
            paddingLeft: 15,
            cursor: 'pointer',
        },
        ratingalign: {
            textAlign: 'right',
        },
        ratingText: {
            fontSize: 14,
            background: '-webkit-linear-gradient(0deg, #ff4f4f 0%, #f44336 50%,  #10a010 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '100%',
            backgroundRepeat: 'repeat',
            paddingRight: 15,
        },
    },
    { index: 1 }
);
