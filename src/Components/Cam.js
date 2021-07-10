import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import { HiOutlineCamera } from "react-icons/hi";

const useStyles = makeStyles((theme) => ({
    PicButton: {},
}));

const Input = styled('input')({
    display: 'none',
});


function Cam(props) {
    const classes = useStyles();
    return (
        <div className={classes.PicButton}>
            <label htmlFor="contained-button-file">
                <Input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={props.onChange} />
                <Button variant="contained" component="span"
                    color="secondary"
                    className={classes.button}
                    endIcon={<HiOutlineCamera />}>
                    Upload
                </Button>
            </label>
        </div>
    );
}

export default Cam;