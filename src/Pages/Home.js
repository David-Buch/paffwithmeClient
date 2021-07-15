import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomButton from '../Components/CustomButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './pages.css';
import BottomSheet from '../Components/BottomSheet';
import { BottomSheetContext, UserContext, AlertContext } from '../Data/Contexts';
import { getLive } from '../Helpers/Api';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BiColumns } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 20,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '240',
        },
    },
    button: {
        margin: theme.spacing(3),
        borderRadius: 20,
    },
    pipeIcon: {
        backgroundColor: theme
    },
    gif: {
        borderRadius: 20,
    },
    isSmokingDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function Home() {
    const classes = useStyles();
    const [isSmoking, setSmoking] = useState(false);
    const [isBsOpen, setBsOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { userStore } = useContext(UserContext);
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        setLoading(true);
        getLive(userStore.username).then((res) => {
            setLoading(false);
            if (res.success) {
                console.log(res);
                setSmoking(res.currentlySmoking);
            }
            else {
                if (res.message) { setAlert({ isAlert: true, status: 'warning', message: res.message }) }
                else { setAlert({ isAlert: true, status: 'error', message: res.error }) }
            }
        });
        //get Smoking durration

    }, []);

    const caculateTimePercentig = () => {
    };


    return (

        <div className={classes.root}>
            <Grid
                container
                spacing={6}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >

                    <Grid item xs={6}>
                        <CustomButton

                            img='img/pipes/smoking-pipe.jpg'
                            onClick={() => { console.log('onClick'); }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <CustomButton
                            img='img/tabacco/sundays-fantasy.jpg'
                            onClick={() => { console.log('onClick'); }}
                        />
                    </Grid>

                </Grid>

                <Grid item xs={12} >
                    {isSmoking ? (
                        <div className={classes.isSmokingDiv}>
                            <img src='img/smokePipe.gif'
                                alt='smokingPipegif'
                                height='200'
                                width='220'
                                className={classes.gif} />
                            <LinearProgress variant='determinate' value={50} color='secondary' style={{ height: 15, width: '85%', padding: 10, margin: '5px' }} />
                            <div style={{ display: 'flex' }}>
                                <Typography style={{ padding: 12 }} variant='h6'>
                                    Have a nice Smoke !  {/* still smoking for ... min */}
                                </Typography>
                                <IconButton style={{ color: 'red' }}>
                                    <MdCancel />
                                </IconButton>
                            </div>
                        </div>) :
                        (
                            <div className={classes.bottomHalf}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={
                                        <img className={classes.pipeIcon} src='img/pipe-icon.png' alt='pipeIcon' height={80} width={80} />
                                    }
                                    onClick={() => setBsOpen(true)}
                                    disabled={isLoading}
                                >
                                    {!isLoading ?
                                        (<>Enjoy a Pipe!</>) : (<CircularProgress />)
                                    }

                                </Button>

                            </div>
                        )}
                </Grid>
            </Grid>
            <BottomSheetContext.Provider value={{ isBsOpen, setBsOpen }}>
                <BottomSheet
                    open={isBsOpen}
                    close={() => setBsOpen(false)}
                />
            </BottomSheetContext.Provider>
        </div>



    );
}
