import { makeStyles } from '@material-ui/core';
import React from 'react';
import ListView from '../Components/ListView';
import Stories from '../Components/Stories';

const data = [
    {
        username: 'david',
        startTime: '14:00',
        endTime: '15:00',
        location: 'Daham',
        date: '27.04.2021',
        smoking: true,
    },
    {
        username: 'basti',
        startTime: '16:00',
        endTime: '17:00',
        location: 'Graz Wohnung',
        date: '25.05.2021',
        smoking: false,
    },
];


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
