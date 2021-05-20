import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
import React, { useContext, useEffect, useState } from 'react';
import ListView from '../Components/ListView';
import Stories from '../Components/Stories';
import { AlertContext, UserContext } from '../Data/Contexts';
import { getSmokeData } from '../Helpers/Api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vW',
        padding: 5,

    },
    storys: {
        display: 'flex',
        paddingLeft: 20,
        alignItems: 'center',
        height: '15vH',
        width: '100vW',
        borderBottomRightRadius: '10%',
        borderBottomLeftRadius: '10%',
        backgroundColor: '#522546',
    },
    listView: {
        marginTop: 10,
    }
}));

export default function Live() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { setAlert } = useContext(AlertContext);
    const { userStore } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        getSmokeData(userStore.username).then((res) => {
            setLoading(false);
            if (res.success) {
                console.log(res);
                setData(JSON.parse(res.smokeData));
            }
            else {
                if (res.message) { setAlert({ isAlert: true, status: 'warning', message: res.message }) }
                else { setAlert({ isAlert: true, status: 'error', message: res.error }) }
            }
        })
    }, []);
    return (
        <div className={classes.root}>
            <div className={classes.storys}>
                {isLoading ? (<CircularProgress />) : (
                    <Stories data={data} />)}
            </div>
            <div className={classes.listView}>
                {isLoading ? (<CircularProgress />) : (
                    <ListView data={data} />)}
            </div>
        </div>
    );
}
