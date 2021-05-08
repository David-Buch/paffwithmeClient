import React, { useContext, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { UserContext } from '../Data/UserContext';
import axios from 'axios';
import { CgProfile } from 'react-icons/cg';

const useStyles = makeStyles((theme) => ({
    SignInRoot: {
        display: 'flex',
        height: '100vh',
        width: '100vW',
    },
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


export default function SignIn() {
    const classes = useStyles();
    const { userStore, setUserStore } = useContext(UserContext);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const textInputChange = (val) => {
        if (val.length >= 4) {
            setUserData({
                ...userData,
                username: val,
            });
        }
    }

    const handelPasswordChange = (val) => {
        if (val.length >= 6) {
            setUserData({
                ...userData,
                password: val,
            });
        }
    }
    function afterSubmission(event) {
        event.preventDefault();
        axios.post('https://paffwithme.herokuapp.com/login',
            {
                username: userData.username,
                password: userData.password
            }).then((res) => {
                if (res.data.success) {
                    setUserStore({
                        username: res.data.username,
                        isLoggedIn: true
                    });
                }
                else {
                    if (res.data.error) { console.log(res.data.error); }
                    if (res.data.message) { console.log(res.data.message); }
                }
            });
        console.log(userStore);
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.SignInRoot}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CgProfile />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
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
                        autoComplete="current-password"
                        onChange={(e) => handelPasswordChange(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    );
}