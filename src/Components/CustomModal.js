import React from 'react';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        //width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



export default function CustomModal(props) {
    const classes = useStyles();
    const body = (
        <div>
            Hi
        </div>
    );
    return (
        <Modal
            style={{ top: '50%', left: '50%' }}
            className={classes.modal}
            open={props.open}
            onClose={props.onClose}>
            {body}
        </Modal>
    );
}
