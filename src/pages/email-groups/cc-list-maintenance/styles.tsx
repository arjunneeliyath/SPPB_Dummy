import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    {
        boxStyle: {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
        },
        rowContainer: {
            padding: '2%',
        },
        gridContainer: {
            background: '#FFFFFF',
        },
        buttonItem: {
            marginTop: 10,
        },
        buttonContainer: {
            marginTop: '10px',
        },
        buttonUpdateItem: {
            marginRight: '10px',
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
        addButton: {
            marginTop: 10,
            color: 'white',
            backgroundColor: '#00529F',
            textTransform: 'none',
        },
        ccMailListField: {
            marginBottom: '10px',
            color: '#00529F',
            font: 'normal normal bold 18px/24px Nunito Sans',
            '& .MuiFormLabel-asterisk': {
                color: 'red',
            },
            fontSize: '15px',
        },
    },
    { index: 1 }
);
