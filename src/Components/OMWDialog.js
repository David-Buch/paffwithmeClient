import React, { useContext } from 'react';
import moment from 'moment';
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
import { BiTime } from 'react-icons/bi';
import { GiSmokingPipe } from 'react-icons/gi';
import { AlertContext, OMWContext, UserContext } from '../Data/Contexts';
import { sendPushtoOne, sendSmokeData } from '../Helpers/Api';


const useStyles = makeStyles((theme) => ({
    dialogRoot: {
        backgroundColor: theme.palette.secondary.light,
    }
}));

export default function OMWDialog(props) {
    const classes = useStyles();
    const { userStore } = useContext(UserContext);
    const { omwData, setOmwData } = useContext(OMWContext);
    const { setAlert } = useContext(AlertContext);
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
        return moment(time).add(timeToAdd, 'minutes').format('HH:mm');
    }
    const send = (location, startTime, endTime, timeToAdd) => {
        sendPushtoOne(
            userStore.username, omwData.to, timeToAdd
        ).then((res) => { console.log(res.data); });
        sendSmokeData(userStore.username, location, startTime, endTime, userStore.color)
            .then((res) => {
                if (res.success) {
                    setAlert({ isAlert: true, status: 'success', message: 'Enjoy your pipe!' });
                }
                else {
                    if (res.message) { setAlert({ isAlert: true, status: 'waring', message: res.message }) }
                    else { setAlert({ isAlert: true, status: 'error', message: res.error }) }
                }
            })
    }

    function handleSubmit() {
        const endTime = addTime(moment(omwData.endTime, 'HH:mm'), value);
        const startTime = addTime(moment(omwData.startTime, 'HH:mm'), value);
        send(omwData.location, startTime, endTime, value);
        setOmwData({ ...omwData, isOpen: false });
    }
    return (
        <Dialog open={props.open} aria-labelledby="Title" >
            <div className={classes.dialogRoot}>
                <DialogTitle id="form-dialog-title" color='textPrimary' >Smoke away!</DialogTitle>
                <DialogContent>
                    <DialogContentText color='textPrimary'>
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
                        color="secondary"
                        className={classes.button}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={< GiSmokingPipe />}
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Send
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

