import React, { useEffect, useState } from 'react';
import { Button, ListItem } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useStyles } from './styles';
import { IRecordFiles } from '../../../../interfaces/quality-inspection-record/edit-quality-inspection/edit-qa-multi-inspection-record';

interface IProps {
    setModalStatus: (modalStatus: boolean) => void;
    handleUpdate: (addedFiles: File[], deletedFiles: string[], index: number) => void;
    setIndex: number;
    files: IRecordFiles[];
}

const FileUploader: React.FC<IProps> = (props: IProps) => {
    const { handleUpdate, setModalStatus, setIndex, files } = props;
    const [fileSrc, setFileSrc] = useState<File[] | IRecordFiles[]>([]);
    const [fileLimit, setFileLimit] = useState<boolean>(false);
    const [fileCount, setFileCount] = useState<number>();
    const [maxFileCount, setMaxFileCount] = useState<number>();
    const [fileInvalid, setFileInvalid] = useState<string>();
    const [existingFiles, setExistingFiles] = useState<IRecordFiles[]>([]);
    const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
    useEffect(() => {
        if (files?.length > 0) {
            setFileSrc(files);
            setExistingFiles(files);
        }
    }, [files]);

    const classes = useStyles();
    const handleUpload = () => {
        const add: any = [...fileSrc].filter((data) => data instanceof File);
        handleUpdate(add, deletedFiles, setIndex);
        setModalStatus(false);
    };

    const changeHandler = async (event: any) => {
        setFileLimit(false);
        setFileInvalid('');
        setFileCount(undefined);
        const files = [...event.target.files];
        if (files.length > 0) {
            const total = fileSrc.length + files.length;
            if (total <= 5) {
                setFileSrc([...fileSrc, ...files]);
                setFileCount(total);
            } else {
                const maxFile = 5 - fileSrc.length;
                setFileCount(undefined);
                setMaxFileCount(maxFile);
                setFileLimit(true);
            }
            event.target.value = '';
        }
    };

    const handleDelete = (File: any, index: number) => {
        setFileInvalid('');
        setFileLimit(false);
        setFileCount(undefined);
        const deletedState: any = [...fileSrc].filter((data, i) => !(i === index));

        setFileSrc(deletedState);
        if (existingFiles.length > 0 && File.fileName) {
            setDeletedFiles([...deletedFiles, existingFiles.filter((data, i) => i === index)[0].fileName]);
        }
    };

    return (
        <div className="App">
            <Grid container spacing={1} className={classes.buttonGrid}>
                <Grid item xs={12} className={classes.centerAlign}>
                    <input
                        className={classes.input}
                        id="contained-button-file"
                        multiple={true}
                        type="file"
                        onChange={changeHandler}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="outlined"
                            className={classes.buttonCamera}
                            color="primary"
                            component="span"
                            startIcon={<InsertPhotoIcon />}
                        >
                            Browse Files
                        </Button>
                    </label>
                </Grid>
            </Grid>
            {fileInvalid ? (
                <Alert severity="warning" className={classes.warningAlert}>
                    {fileInvalid}
                </Alert>
            ) : null}
            {fileLimit ? (
                <Alert severity="warning" className={classes.warningAlert} variant="outlined">
                    <AlertTitle>Warning</AlertTitle>
                    <>
                        Max number of files is 5 <br></br>
                        {maxFileCount && maxFileCount < 5 ? (
                            <>
                                <b> {maxFileCount}</b> more {maxFileCount === 1 ? 'file' : 'files'} can be added
                            </>
                        ) : null}
                    </>
                </Alert>
            ) : null}
            {fileCount === undefined ? null : (
                <Alert variant="outlined" severity="success" className={classes.warningAlert}>
                    {fileCount} out of 5 files available
                </Alert>
            )}
            <Grid container>
                <div className={classes.imageDisplay}>
                    {fileSrc.map((file: any, index: any) => (
                        <ListItem divider key={index}>
                            <p>{file.name ? file.name : file.fileName}</p>
                            <ImageListItemBar
                                actionIcon={
                                    <IconButton aria-label="delete" className={classes.icon}>
                                        <DeleteIcon onClick={() => handleDelete(file, index)} />
                                    </IconButton>
                                }
                            />
                        </ListItem>
                    ))}
                </div>
            </Grid>
            <Grid className={classes.leftAlign}>
                <Button
                    variant="contained"
                    className={classes.uploadButton}
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUpload}
                    disabled={fileSrc?.length === 0}
                >
                    Upload
                </Button>
            </Grid>
        </div>
    );
};

export default FileUploader;
