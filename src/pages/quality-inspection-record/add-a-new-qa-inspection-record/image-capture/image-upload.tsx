import React, { useEffect, useState } from 'react';
import WebcamCapture from './webcam-capture';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Modal from '../../../../components/modal/modal';
import { Button, FormLabel } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useStyles } from './styles';

interface IProps {
    setModalStatus: (modalStatus: boolean) => void;
    handleUpdate: (data: any, index: number) => void;
    setIndex: number;
    images: File[];
}

const ImageUpload: React.FC<IProps> = (props: IProps) => {
    const { handleUpdate, setModalStatus, setIndex, images } = props;
    const [viewModal, setViewModal] = React.useState(false);
    const [buttonDisable, setButtonDisable] = React.useState(true);
    const [imgSrcUpload, setImgSrcUpload] = useState<File[]>([]);
    const [imgLimit, setImgLimit] = useState<boolean>(false);
    const [imgCount, setImgCount] = useState<number>();
    const [maxImgCount, setMaxImgCount] = useState<number>();
    const [fileInvalid, setFileInvalid] = useState<string>();
    const webCamArray: any = [];

    useEffect(() => {
        if (images?.length > 0) {
            setImgSrcUpload(images);
        }
    }, [images]);

    const openWebCam = () => {
        setViewModal(true);
    };
    const classes = useStyles();

    const onCaptureClick = (imgCapture: any) => {
        setImgLimit(false);
        setButtonDisable(false);
        setFileInvalid('');
        setMaxImgCount(imgSrcUpload.length + 1);
        setImgCount(imgSrcUpload.length + 1);
        webCamArray.push(imgCapture);
        if (imgSrcUpload.length < 10) {
            setImgSrcUpload([...imgSrcUpload, ...webCamArray]);
        } else {
            setImgCount(undefined);
            setImgLimit(true);
        }
    };

    const handleUpload = () => {
        handleUpdate(imgSrcUpload, setIndex);
        setModalStatus(false);
    };

    const changeHandler = async (event: any) => {
        setImgLimit(false);
        setButtonDisable(false);
        setFileInvalid('');
        setImgCount(undefined);
        const files = [...event.target.files];
        const fileTypeCheck: boolean = files
            .map((file) => /\.(jpe?g|png|gif|svg|bmp|jfif)$/i.test(file.name))
            .every((v) => v === true);
        if (fileTypeCheck) {
            if (files.length !== 0) {
                const total = imgSrcUpload.length + files.length;
                if (imgSrcUpload.length < 10 && files.length <= 10 && total <= 10) {
                    setImgSrcUpload([...imgSrcUpload, ...files]);
                    setImgCount(total);
                } else {
                    const maxImage = 10 - imgSrcUpload.length;
                    setImgCount(undefined);
                    setMaxImgCount(maxImage);
                    setImgLimit(true);
                }
                event.target.value = '';
            }
        } else {
            setFileInvalid('Invalid file type');
        }
    };

    const handleDelete = (image: any, index: number) => {
        setFileInvalid('');
        setButtonDisable(false);
        setImgLimit(false);
        setImgCount(undefined);
        const deletedState = [...imgSrcUpload].filter((data, i) => !(i === index));
        setImgSrcUpload(deletedState);
    };
    return (
        <div className="App">
            <Grid container spacing={1} className={classes.buttonGrid}>
                <Grid item xs={12} className={classes.centerAlign}>
                    <Button
                        className={classes.buttonCamera}
                        variant="outlined"
                        color="primary"
                        component="span"
                        startIcon={<PhotoCameraIcon />}
                        onClick={openWebCam}
                    >
                        Use Camera
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.centerAlign}>
                    <FormLabel className={classes.labelField}>OR</FormLabel>
                </Grid>
                <Grid item xs={12} className={classes.centerAlign}>
                    <input
                        accept="image/*"
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
                            Browse Gallery
                        </Button>
                    </label>
                </Grid>
            </Grid>

            <Modal
                maxWidth={'sm'}
                title="Take a photo"
                content={<WebcamCapture setModalStatus={setViewModal} onCaptureClick={onCaptureClick} />}
                modalStatus={viewModal}
                setModalStatus={setViewModal}
            />
            {fileInvalid ? (
                <Alert severity="warning" className={classes.warningAlert}>
                    {fileInvalid}
                </Alert>
            ) : null}
            {imgLimit ? (
                <Alert severity="warning" className={classes.warningAlert} variant="outlined">
                    <AlertTitle>Warning</AlertTitle>
                    <>
                        Max number of images is 10 <br></br>
                        {maxImgCount && maxImgCount < 10 ? (
                            <>
                                <b> {maxImgCount}</b> more {maxImgCount === 1 ? 'image' : 'images'} can be added
                            </>
                        ) : null}
                    </>
                </Alert>
            ) : null}
            {imgCount === undefined ? null : (
                <Alert variant="outlined" severity="success" className={classes.warningAlert}>
                    {imgCount} out of 10 images available
                </Alert>
            )}
            <Grid container>
                <div className={classes.imageDisplay}>
                    <ImageList rowHeight={120} className={classes.imageList} cols={4} gap={10}>
                        <ImageListItem key="Subheader" style={{ height: 'auto', width: '100%' }}>
                            <ListSubheader component="div" className={classes.subHeadText}>
                                Gallery
                            </ListSubheader>
                        </ImageListItem>
                        {imgSrcUpload.map((image: any, index) => (
                            <ImageListItem key={index}>
                                <img src={URL.createObjectURL(image)} />
                                <ImageListItemBar
                                    actionIcon={
                                        <IconButton aria-label="delete" className={classes.icon}>
                                            <DeleteIcon onClick={() => handleDelete(image, index)} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
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
                    disabled={buttonDisable}
                >
                    Save
                </Button>
            </Grid>
        </div>
    );
};

export default ImageUpload;
