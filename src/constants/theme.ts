import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00529F',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F6F6F6',
        },
        secondary: {
            main: '#FFFFFF',
            light: '#0065FF',
        },
        text: {
            primary: '#2C2A29',
        },
    },
    typography: {
        fontFamily: ['Nunito', 'sans-serif'].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '.Mui-disabled': { background: '#cccccc', color: '#eeeeee' },
            },
        },
        MuiInputBase: {
            input: {
                '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                },
            },
        },
    },
});

export default theme;
