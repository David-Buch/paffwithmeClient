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
import Alert from '@material-ui/lab/Alert';
import { UserContext } from '../Data/Contexts';
import { CgProfile } from 'react-icons/cg';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { loginUser } from '../Helpers/Api';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({

    root: {
        height: '100vh',
        width: '100vW',
    },
    errorDisplay: {
        display: 'flex',
        paddingTop: 10,
        justifyContent: 'center'
    },
    SignInRoot: {
        display: 'flex',
        justifyContent: 'center',
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
    const { setUserStore } = useContext(UserContext);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({
        isError: false,
        message: ''
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            loginUser(values.username, values.password).then(response => {
                setLoading(false);
                if (response.success) {
                    //login worked
                    setUserStore({
                        username: response.username,
                        isLoggedIn: true,
                        isLoading: true
                    });
                }
                else {
                    //login didnt work 
                    if (response.message) {
                        console.log(response.message);
                        setError({ isError: true, message: response.message })

                    } else {
                        //login Server Error
                        if (response.error) {
                            setError({ isError: true, message: 'Server Error' });
                        }
                    }
                }
            })

        },
    });

    return (
        <div className={classes.root}>
            <div className={classes.errorDisplay}>
                {error.isError ? (
                    <Alert
                        severity='error'
                        variant='outlined'>
                        {error.message}</Alert>
                ) : null}
            </div>
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
                            disabled={isLoading}
                        >
                            {!isLoading ?
                                (<>Log In</>) : (<CircularProgress />)
                            }
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
        </div>
    );
}