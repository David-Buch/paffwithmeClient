import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Data/UserContext';
import { getSubscription } from '../PushNotification/PushNotification';

export default function Loading() {

    const { userStore, setUserStore } = useContext(UserContext);

    useEffect(() => {
        console.log('hi im running');
        getSubscription().then((res) => {
            console.log(res);
            setUserStore({ ...userStore, isLoading: false })
        })
    }, []);

    return (

        <div style={{ height: '100vH', width: '100vW', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size={60} />
        </div>

    );
}
