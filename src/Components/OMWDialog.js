import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { BiTime } from 'react-icons/bi'
import { AlertContext, OMWContext, SmokingContext, UserContext } from '../Data/Contexts';
import { sendPushtoAll, sendPushtoOne, sendSmokeData } from '../Helpers/Api';


const useStyles = makeStyles((theme) => ({

}));

export default function OMWDialog(props) {
    const classes = useStyles();
    const { userStore } = useContext(UserContext);
    const { omwData, setOmwData } = useContext(OMWContext);
    const { setAlert } = useContext(AlertContext);
    const { setSmoking } = useContext(SmokingContext);
    const [value, setValue] = React.useState(5);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 30) {
            setValue(30);
        }
    };
    const addTime = (time, timeToAdd) => {
        var timeInt;
        timeInt = (time.split(':').reduce((acc, time1) => (60 * acc) + +time1)) + timeToAdd;
        var m = timeInt % 60;
        var h = (timeInt - m) / 60;
        return (('0' + h.toString()).substr(-2) + ":"
            + (m < 10 ? "0" : "") + ('0' + m.toString()).substr(-2));
    }
    const send = (location, startTime, endTime, smokingDuration, timeToAdd) => {
        sendPushtoOne(
            userStore.username, omwData.to, timeToAdd
        ).then((res) => { console.log(res.data); });
        sendSmokeData(userStore.username, location, startTime, endTime)
            .then((res) => {
                if (res.success) {
                    setAlert({ isAlert: true, status: 'success', message: 'Push was send! Enjoy your pipe!' });
                    setTimeout(() => {
                        setSmoking(true);
                        setTimeout(() => {
                            setSmoking(false)
                        }, (smokingDuration + (timeToAdd * 60)) * 1000);
                    }, timeToAdd * 60 * 1000)
                }
                else {
                    if (res.message) { setAlert({ isAlert: true, status: 'waring', message: res.message }) }
                    else { setAlert({ isAlert: true, status: 'error', message: res.error }) }
                }
            })
    }
    function getDuration(startTime, endTime) {
        var duration =
            (endTime.split(':').reduce((acc, time) => (60 * acc) + +time) * 60) -
            (startTime.split(':').reduce((acc, time) => (60 * acc) + +time) * 60);
        if (duration <= 0) {
            duration =
                (endTime.split(':').reduce((acc, time) => (60 * acc) + +time) * 60) -
                (startTime.split(':').reduce((acc, time) => (60 * acc) + +time) * 60) + (24 * 60 * 60);

        }
        return duration;
    }

    function handleSubmit() {
        const endTime = addTime(omwData.endTime, value);
        const startTime = addTime(omwData.startTime, value);
        const smokingDuration = getDuration(startTime, endTime);
        send(omwData.location, startTime, endTime, smokingDuration, value);
        setOmwData({ ...omwData, isOpen: false });

    }
    return (
        <Dialog open={props.open} aria-labelledby="Title">
            <DialogTitle id="form-dialog-title">Smoke away!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    How long will it take you to join the smoke session?
          </DialogContentText>
                <div className={classes.root}>
                    <Typography id="input-slider" gutterBottom>
                        Minutes
      </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <BiTime size={20} />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                step={5}
                                max={30}
                                marks

                                value={typeof value === 'number' ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"

                            />
                        </Grid>
                        <Grid item>
                            <Input
                                className={classes.input}
                                value={value}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 5,
                                    min: 0,
                                    max: 30,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                endAdornment={'min'}
                            />
                        </Grid>
                    </Grid>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOmwData({ ...omwData, isOpen: false })}
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                    Cancel
          </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmit}
                >
                    Send
          </Button>
            </DialogActions>
        </Dialog>
    )
}
