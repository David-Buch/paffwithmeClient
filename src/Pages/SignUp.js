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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { signupUser } from '../Helpers/Api';


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
    password2: Yup
        .string('Enter your password')
        .test('password-match', 'Passwords do not match', function (value) {
            let { password } = this.parent;
            return password == value;
        })
        .required('password time is required'),
});

export default function SignUp() {
    const classes = useStyles();
    const { userStore, setUserStore } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            password2: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values); //
            let response = signupUser(values.username, values.password);
            console.log(response); //
            if (response.message) { alert(response.message); }
            else {
                setUserStore({
                    username: response.username,
                    isLoggedIn: true,
                    //isLoading: true
                });
            }
        }
    });

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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                        error={formik.touched.password2 && Boolean(formik.errors.password2)}
                        helperText={formik.touched.password2 && formik.errors.password2}


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