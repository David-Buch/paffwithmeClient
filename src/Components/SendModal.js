import { makeStyles, Modal, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function SendModal(props) {

    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <Typography variant='h4'>
                Gut Paff!
            </Typography>
            <Typography variant='h6'>
                Pfeife wird geraucht
            </Typography>
        </div>
    );

    return (
        <Modal
            open={props.open}
            onClose={props.close}
            closeAfterTransition
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}
