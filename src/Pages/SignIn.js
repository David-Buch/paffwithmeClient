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
import Alert from '@material-ui/lab/Alert'
import { UserContext } from '../Data/UserContext';
import { CgProfile } from 'react-icons/cg';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { loginUser } from '../Helpers/Api';

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

const validationSchema = Yup.object({
    username: Yup
        .string('Enter your username')
        .matches(/^[aA-zZ\s]+$/, "Only letters are allowed in your username ")
        .min(4, "username must be at least 4 characters long")
        .required('username is required'),
    password: Yup
        .string('Enter your password')
        .min(6, 'Password must be at least 6 characters long')
        .max(18, 'Password cant be longer than 18 characters')
        .required('password time is required'),
});

export default function SignIn() {
    const classes = useStyles();
    const { userStore, setUserStore } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values); //
            loginUser(values.username, values.password).then(response => {
                console.log(response);
                if (response.success) {
                    console.log('hi');
                    setUserStore({
                        username: values.username,
                        isLoggedIn: true,
                        isLoading: false
                    });
                }
                else {
                    if (response.message) {
                        console.log(response.message);
                        <Alert severity='error'>{response.message}</Alert>
                    } else { console.log(response); }
                }
            })
        },
    });

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
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
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
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
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