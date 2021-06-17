import IconButton from '@material-ui/core/IconButton';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BiRadioCircle } from 'react-icons/bi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cam: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

function CamCapture(props) {
    const classes = useStyles();
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);
    const [constraints, setConstraints] = useState({
        facingMod: 'user'
    });
    const size = useWindowSize();
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);

    return (
        <div>
            {img == null ? (
                <div className={classes.cam}>

                    <Webcam audio={false} videoConstraints={{ deviceId }} ref={webcamRef} />
                    <div>
                        {devices.map((device, key) => (
                            <button
                                key={device.deviceId}
                                onClick={() => setDeviceId(device.deviceId)}
                            >
                                {device.label || `Device ${key + 1}`}
                            </button>
                        ))}
                    </div>
                    <IconButton aria-label='capture' color="primary" size={20} onClick={capture} >
                        <BiRadioCircle />
                    </IconButton>
                </div>
            ) : (
                <div>
                    <IconButton aria-label='close' color="primary" size={20} onClick={() => setImg(null)} >
                        <BiRadioCircle />
                    </IconButton>
                    <img src={img} alt='img'></img>
                </div>
            )}

        </div>
    );
}
/*
<IconButton aria-label='capture' color="primary" size={10} onClick={flipCamera} >
                        <BiRadioCircle />
                    </IconButton>
                    
<Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        ref={webcamRef}
                        videoConstraints={constraints}
                        style={{
                            height: "90vH",
                            width: "100vW",
                            objectFit: "fill",

                        }}
                    />
*/


// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight * 0.9,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default CamCapture;