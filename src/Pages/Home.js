import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomButton from '../Components/CustomButton';
import { Button, makeStyles } from '@material-ui/core';
import './pages.css';
import BottomSheet from '../Components/BottomSheet';
import SendModal from '../Components/SendModal';
import { BottomSheetContext } from '../Data/BottomSheetContext';


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

}));

export default function Home() {
    const classes = useStyles();
    const [isBsOpen, setBsOpen] = useState(false);

    // in SheetForm i guess
    const [isModalOpen, setModalOpen] = useState(false);
    const [btnDisabled, setBtnDisabeld] = useState(false);


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

                <Grid item xs={12}>
                    <div className={classes.bottomHalf}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={
                                <img className={classes.pipeIcon} src='img/pipe-icon.png' alt='pipeIcon' height={80} width={80} />
                            }
                            onClick={() => setBsOpen(true)}
                            disabled={btnDisabled}
                        >
                            Enjoy a Pipe!
                        </Button>

                    </div>

                </Grid>
            </Grid>
            <BottomSheetContext.Provider value={{ isBsOpen, setBsOpen }}>
                <BottomSheet
                    open={isBsOpen}
                    close={() => setBsOpen(false)}
                />
            </BottomSheetContext.Provider>
            <SendModal
                open={isModalOpen}
                close={() => setModalOpen(false)} />
        </div>



    );
}
