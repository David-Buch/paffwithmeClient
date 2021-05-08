import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { CgProfile } from 'react-icons/cg';
import { UserContext } from '../Data/UserContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const { setUserStore } = useContext(UserContext);
    const [data, setData] = useState({
        username: '',
        password: '',
        password2: '',
    });

    const textInputChange = (val) => {
        if (val.length >= 4) {
            setData({
                ...data,
                username: val,
            });
        }
    }

    const handelPasswordChange = (val) => {
        if (val.length >= 6) {
            setData({
                ...data,
                password: val,
            });
        }
    }
    const handelConfirmPasswordChange = (val) => {
        if (val.length >= 6) {
            setData({
                ...data,
                password2: val,
            });
        }
    }

    function afterSubmission(event) {
        event.preventDefault();
        if (data.password === data.password2) {
            axios.post('https://paffwithme.herokuapp.com/register',
                {
                    username: data.username,
                    password: data.password
                }).then((res) => {
                    if (res.data.success) {
                        setUserStore({
                            username: data.username,
                            isLoggedIn: true
                        });
                    }
                    else {
                        if (res.data.error) { console.log(res.data.error); }
                        if (res.data.message) { console.log(res.data.message); }
                    }
                });
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CgProfile />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
        </Typography>
                <form className={classes.form} noValidate onSubmit={afterSubmission}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => textInputChange(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => handelPasswordChange(e.target.value)}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        onChange={(e) => handelConfirmPasswordChange(e.target.value)}

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>

                </form>
            </div>
        </Container>
    );
}