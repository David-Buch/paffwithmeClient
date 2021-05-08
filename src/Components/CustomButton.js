import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    ButtonRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '100',
    },

    buttonBase: {
        position: 'relative',
        borderRadius: '20%',

        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.4,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    img: {
        [theme.breakpoints.down('xs')]: {
            width: '110%',
            height: '110%'
        },
        height: '90%',
        width: '90%',
        borderRadius: '20%',
    },
    imageBackdrop: {

    },
    imageMarked: {

    },
    imageTitle: {

    },
}));

export default function CustomButton(props) {
    const classes = useStyles();

    return (
        <div className={classes.ButtonRoot}>
            <ButtonBase
                onClick={props.onClick}
                className={classes.buttonBase}
                focusVisibleClassName={classes.focusVisible}>
                <img className={classes.img} src={props.img} alt='hi' />
            </ButtonBase>
        </div>
    )
}
