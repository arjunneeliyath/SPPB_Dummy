import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';
import { isMobile } from 'react-device-detect';

interface IAddPhotoProps {
    setModalStatus: (modalStatus: boolean) => void;
    onCaptureClick: (captureImage: any) => void;
}

const WebcamCapture = (props: IAddPhotoProps) => {
    const { setModalStatus, onCaptureClick } = props;
    const [isDisable, setIsDisabled] = React.useState(false);
    const classes = useStyles();
    const webcamRef = useRef<Webcam>(null);

    const captureImage = () => {
        if (webcamRef.current) {
            const imageNewSrc: any = webcamRef.current.getScreenshot();
            if (imageNewSrc) {
                setIsDisabled(true);
                fetch(imageNewSrc)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], 'File name', { type: 'image/jpeg' });
                        onCaptureClick(file);
                    });
                setModalStatus(false);
            }
        }
    };

    const videoConstraints = {
        facingMode: { exact: isMobile ? 'environment' : 'user' },
    };

    return (
        <>
            <Grid item>
                <Grid container className={classes.buttonContainer}>
                    <Grid item xs={3} className={classes.buttonItem}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.buttonSubmit}
                            disabled={isDisable}
                            onClick={() => {
                                captureImage();
                            }}
                        >
                            Capture
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                imageSmoothing
            />
        </>
    );
};

export default WebcamCapture;
