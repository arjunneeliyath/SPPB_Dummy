import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { styles } from './styles';

export interface IConfirmModalProps {
    title: string;
    message: string;
    successButtonTitle?: string;
    cancelButtonTitle?: string;
    buttonVariant: 'text' | 'outlined' | 'contained';
    confirmModalStatus: boolean;
    onSuccess: () => void;
    onCancel: () => void;
}

const ConfirmModal = (props: IConfirmModalProps) => {
    const classes = styles();
    const {
        title,
        message,
        successButtonTitle = 'YES',
        cancelButtonTitle = 'NO',
        onCancel,
        onSuccess,
        buttonVariant,
        confirmModalStatus,
    } = props;

    return (
        <Dialog
            classes={{ paper: classes.shape }}
            aria-labelledby="customized-dialog-title"
            open={confirmModalStatus}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="customized-dialog-title" classes={{ root: classes.dialogTitle }} className={classes.title}>
                <Typography variant="h6">{title}</Typography>
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }} className={classes.content}>
                {message}
                <DialogActions classes={{ root: classes.dialogActions }}>
                    <Button
                        color="primary"
                        variant={buttonVariant}
                        className={classes.button}
                        autoFocus
                        onClick={onSuccess}
                    >
                        {successButtonTitle}
                    </Button>
                    <Button
                        color="primary"
                        variant={buttonVariant}
                        className={classes.button}
                        autoFocus
                        onClick={onCancel}
                    >
                        {cancelButtonTitle}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
export default ConfirmModal;
