import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { HiLocationMarker, HiOutlineCamera } from "react-icons/hi";
import { BiSend } from 'react-icons/bi';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { sendPushtoAll, sendSmokeData, uploadFile } from '../Helpers/Api';
import { AlertContext, BottomSheetContext, UserContext } from '../Data/Contexts';
import Cam from './Cam';


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
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "black !important"
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
    const [img, setImg] = useState(null);
    let currentHours = ('0' + new Date().getHours()).substr(-2);
    let currentMin = ('0' + Math.ceil(new Date().getMinutes() / 5) * 5).substr(-2);
    let currentTime = currentHours.concat(':', currentMin);

    const send = (values) => {

        sendPushtoAll(
            userStore.username
        ).then((res) => { console.log(res.data); });
        sendSmokeData(userStore.username, values.location, values.startTime, values.endTime, userStore.color)
            .then((res) => {
                if (res.success) {
                    setAlert({ isAlert: true, status: 'success', message: 'Push was send! Enjoy your pipe!' });
                }
                else {
                    if (res.message) { setAlert({ isAlert: true, status: 'waring', message: res.message }) }
                    else { setAlert({ isAlert: true, status: 'error', message: res.error }) }
                }
            })

        if (img != null) {
            uploadFile(img, userStore.username).then((res) => {
                if (res.success) {
                    console.log('worked');
                }
                else {
                    if (res.message) { setAlert({ isAlert: true, status: 'waring', message: res.message }) }
                    else { setAlert({ isAlert: true, status: 'error', message: res.error }) }
                }
            });
        }

    }

    const formik = useFormik({
        initialValues: {
            location: '',
            startTime: currentTime,
            endTime: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setBsOpen(false);
            send(values);
        }
    })
    const handleImageChange = (event) => {
        setImg(
            //URL.createObjectURL(
            event.target.files[0]
        );
    };

    return (
        <div>
            <form
                className={classes.container}
                onSubmit={formik.handleSubmit}
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
                                label="Starting Time"
                                variant='outlined'
                                type="time"
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                helperText={formik.touched.startTime && formik.errors.startTime}
                                InputLabelProps={{
                                    shrink: true,

                                }}
                                inputProps={{
                                    step: 300, // 5 min

                                }}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}

                            />
                            <TextField
                                className={classes.textField}
                                id="endTime"

                                label="Ending Time"
                                variant='outlined'
                                type="time"
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                helperText={formik.touched.endTime && formik.errors.endTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.location}
                            id="location"
                            variant='outlined'
                            label="Location"
                            type='text'
                            placeholder='Your Location'
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HiLocationMarker />
                                    </InputAdornment>
                                ),
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}
                        container
                        spacing={2}
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <Cam onChange={handleImageChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.buttonDiv}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<BiSend />}
                                >
                                    Send
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

            </form>
        </div >
    );
}
