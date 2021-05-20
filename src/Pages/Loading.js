import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { UserContext, AlertContext } from '../Data/Contexts';
import { getSubscription } from '../Helpers/PushNotification';

export default function Loading() {

    const { userStore, setUserStore } = useContext(UserContext);
    const { setAlert } = useContext(AlertContext);
    useEffect(() => {
        getSubscription(userStore.username).then((res) => {
            console.log(res)
            if (!res.success) {
                setAlert({
                    isAlert: true,
                    status: 'warning',
                    message: res.message
                });
            }
            setUserStore({ ...userStore, isLoading: false })
        })
    }, []);

    return (
        <div style={{ height: '100vH', width: '100vW', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size={60} />
        </div>
    );
}
