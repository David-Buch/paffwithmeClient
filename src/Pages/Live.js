import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import ListView from '../Components/ListView';
import Stories from '../Components/Stories';
import { AlertContext } from '../Data/AlertContext';
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
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        console.log('hi');
        getSmokeData().then((res) => {
            if (res.success) {
                console.log(res);
                setData(JSON.parse(res.smokeData));
                setAlert({ isAlert: true, status: 'success', message: 'got all the data' })
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
                <Stories data={data} />
            </div>
            <div className={classes.listView}>
                <ListView data={data} />
            </div>
        </div>
    );
}
