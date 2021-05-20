import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Data/Contexts';
import { getSubscription } from '../Helpers/PushNotification';

export default function Loading() {

    const { userStore, setUserStore } = useContext(UserContext);

    useEffect(() => {
        getSubscription(userStore.username).then(() => {
            setUserStore({ ...userStore, isLoading: false })
        })
    }, []);

    return (
        <div style={{ height: '100vH', width: '100vW', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size={60} />
        </div>
    );
}
