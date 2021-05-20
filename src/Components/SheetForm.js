import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { HiLocationMarker } from "react-icons/hi";
import { BiSend } from 'react-icons/bi';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { sendPushtoAll, sendSmokeData } from '../Helpers/Api';
import { SmokingContext, AlertContext, BottomSheetContext, UserContext } from '../Data/Contexts';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
    },
    buttonDiv: {
        display: 'flex', justifyContent: 'center',
    },
    button: { paddingTop: 10, width: '60vW' },
    timetf: {
        display: 'flex',
        justifyContent: 'center',
    },
    location: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 315,

    },
    grid: {
        marginTop: theme.spacing(3),
    }

}));

const validationSchema = Yup.object({
    location: Yup
        .string('Enter your location')
        .required('location is required'),
    startTime: Yup
        .string('Enter your starting time')
        .required('starting time is required'),
    endTime: Yup
        .string('Enter your targeted finish time')
        .required('finish time is required')
});

export default function SheetForm() {

    const classes = useStyles();
    const { userStore } = useContext(UserContext);
    const { setAlert } = useContext(AlertContext);
    const { setBsOpen } = useContext(BottomSheetContext);
    const { setSmoking } = useContext(SmokingContext);
    let currentHours = ('0' + new Date().getHours()).substr(-2);
    let currentMin = Math.ceil(new Date().getMinutes() / 5) * 5;


    let currentTime = currentHours.concat(':', currentMin);
    const formik = useFormik({
        initialValues: {
            location: '',
            startTime: currentTime,
            endTime: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setBsOpen(false);
            const smokingDuration = getDuration(values.startTime, values.endTime);
            sendPushtoAll(
                userStore.username
            ).then((res) => { console.log(res.data); });
            sendSmokeData(userStore.username, values.location, values.startTime, values.endTime)
                .then((res) => {
                    if (res.success) {
                        setAlert({ isAlert: true, status: 'success', message: 'send SmokeData worked' })
                        setSmoking(true);
                        setTimeout(setSmoking(false), smokingDuration * 1000);
                    }
                    else {
                        if (res.message) { setAlert({ isAlert: true, status: 'waring', message: res.message }) }
                        else { setAlert({ isAlert: true, status: 'error', message: res.error }) }
                    }
                })
        },
    });
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

    return (
        <div>
            <form
                className={classes.container}
                onSubmit={formik.handleSubmit}
            //onSubmit={(event) => props.onSend(event, sendData)}
            >
                <Grid
                    className={classes.grid}
                    container
                    spacing={2}
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <div className={classes.timetf}>
                            <TextField
                                className={classes.textField}
                                id="startTime"
                                color='secondary'
                                label="Starting Time"
                                variant='outlined'
                                type="time"
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                helperText={formik.touched.startTime && formik.errors.startTime}
                                //onChange={(e) => setSendData({ ...sendData, startTime: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <TextField
                                className={classes.textField}
                                id="endTime"
                                color='secondary'
                                label="Ending Time"
                                variant='outlined'
                                type="time"
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                helperText={formik.touched.endTime && formik.errors.endTime}
                                //onChange={(e) => setSendData({ ...sendData, endTime: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.location}
                            id="location"
                            variant='outlined'
                            color='secondary'
                            label="Location"
                            type='text'
                            placeholder='Your Location'
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                            //onChange={(e) => setSendData({ ...sendData, location: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HiLocationMarker />
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.buttonDiv}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<BiSend />}
                            >
                                Send
                  </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
