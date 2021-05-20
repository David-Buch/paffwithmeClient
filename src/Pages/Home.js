import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomButton from '../Components/CustomButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './pages.css';
import BottomSheet from '../Components/BottomSheet';
import { BottomSheetContext, SmokingContext } from '../Data/Contexts';

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
    }
}));

export default function Home() {
    const classes = useStyles();

    const [isBsOpen, setBsOpen] = useState(false);
    const [isSmoking, setSmoking] = useState(false);

    return (
        <SmokingContext.Provider value={{ isSmoking, setSmoking }}>
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
                            <div>
                                <img src='img/smokePipe.gif'
                                    alt='smokingPipegif'
                                    height='200'
                                    width='220'
                                    className={classes.gif} />
                                <Typography>
                                    Gut Paff!
                                </Typography>
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
                                    >
                                        Enjoy a Pipe!
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
        </SmokingContext.Provider>



    );
}
