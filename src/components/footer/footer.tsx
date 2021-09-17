import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <footer>
            <Box className={classes.copyWriteStyle}>&copy; Copyright - Albertsons Confidential</Box>
        </footer>
    );
};
export default Footer;
