import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
import React, { useContext, useEffect, useState } from 'react';
import ListView from '../Components/ListView';
import Stories from '../Components/Stories';
import { AlertContext, OMWContext, UserContext } from '../Data/Contexts';
import { getFile, getLive, getSmokeData } from '../Helpers/Api';
import OMWDialog from '../Components/OMWDialog';
import StoriePopUp from '../Components/StoriePopUp';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vW',
        paddingTop: 5,

    },
    storys: {
        display: 'flex',
        paddingLeft: 20,
        alignItems: 'center',
        height: '15vH',
        width: '100vW',
        borderBottomRightRadius: '10%',
        borderBottomLeftRadius: '10%',
        backgroundColor: theme.palette.secondary.main,
    },
    listView: {
        marginTop: 10,
    }
}));

export default function Live() {
    const classes = useStyles();
    const [img, setImg] = useState([]);
    const [isPopUp, setPopUp] = useState(false);
    const [isSmoking, setSmoking] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [omwData, setOmwData] = useState({
        isOpen: false,
        startTime: '',
        endTime: '',
        location: ''
    });

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
        getLive(userStore.username).then((res) => {
            if (res.success) { setSmoking(res.currentlySmoking); }
            else {
                if (res.message) { setAlert({ isAlert: true, status: 'warning', message: res.message }) }
            }
        })
    }, []);
    const handleStorie = () => {

        getFile(userStore.username).then((res) => {
            console.log(res);
            if (res instanceof Blob) {
                console.log('2');
                console.log(res);
                setImg([URL.createObjectURL(res)]);
                setPopUp(true);
            }
            else {
                setAlert({ isAlert: true, status: 'warning', message: res.message })

            }
        })
    }

    return (
        <OMWContext.Provider value={{ omwData, setOmwData }}>
            <div className={classes.root}>
                <div className={classes.storys}>
                    {isLoading ? (<CircularProgress />) : (
                        <Stories data={data} onClick={handleStorie} />)}
                </div>
                <div className={classes.listView}>
                    {isLoading ? (<CircularProgress />) : (
                        <ListView
                            data={data}
                            live={isSmoking} />)}
                </div>
                <OMWDialog
                    open={omwData.isOpen}

                />
            </div>
            <StoriePopUp open={isPopUp} stories={img} onAllStoriesEnd={() => setPopUp(false)} />
        </OMWContext.Provider>
    );
}
