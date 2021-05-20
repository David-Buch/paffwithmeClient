import axios from 'axios';

const publicKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
const convertedKey = urlBase64ToUint8Array(publicKey);
//chrome://inspect/#devices
export function getSubscription(username) {
    Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
    });

    return navigator.serviceWorker.ready.then(function (registration) {
        console.log('Registration successful, scope is:', registration.scope);
        if (registration.pushManager) {
            registration.pushManager.getSubscription().then(function (sub) {
                if (sub === null) {
                    console.log('Not subscribed to push service!');
                    subscribeUser(username);
                } else {
                    // We have a subscription, update the database
                    // Check if subcription object is the same as the one in the db
                    console.log('Have a Subscription object: ');
                    subscribeUser(username);
                }
            });
        }
        else {
            return { success: false, message: 'Push Notifications are not supported, for the full experience switch to another browser' }
        }
        if (Notification.permission === 'denied') {
            return { success: false, message: 'Please allow Notifications' }
        }
    });


}

function subscribeUser(username) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (reg) {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedKey

            }).then(function (sub) {
                sendSubscriptionToBackEnd(sub, username).then((res) => {
                    console.log(res);
                    return res.data;
                })
            }).catch(function (e) {
                return { success: false, message: 'Unable to subscribe to push', e }
            }
            );
        })
    }
}

function sendSubscriptionToBackEnd(sub, username) {
    return axios.post('https://paffwithme.herokuapp.com/notification/subscribe', {
        username: username,
        subscription: sub
    }).then((response) => {
        console.log(response);
        return response.data;
    }).catch((error) => {
        throw new Error('Bad response from server.' + error);
    })
}


