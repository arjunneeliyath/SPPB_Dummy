import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import { DialogContent } from '@material-ui/core';

export interface IModalProps {
    content?: React.ReactNode;
    title?: string;
    maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    modalStatus: boolean;
    setModalStatus: (modalStatus: boolean) => void;
}

const Modal = (props: IModalProps) => {
    const classes = styles();
    const { content, modalStatus, title, maxWidth, setModalStatus } = props;
    return (
        <Dialog
            classes={{ paper: classes.shape }}
            aria-labelledby="customized-dialog-title"
            open={modalStatus}
            maxWidth={maxWidth}
            fullWidth
        >
            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">{title}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => setModalStatus(false)}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </MuiDialogTitle>
            <DialogContent dividers>{content}</DialogContent>
        </Dialog>
    );
};

export default Modal;
