import axios from 'axios';

const publicKey = 'BEfTrbmLEi8GZXmNyPBr7lUhaxCc6-OGO8ygoCk2l4ljF81cVD9kkNSzmsMqE4k-r9el-adxNQwB1glNryD4AcE';
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
//chrome://inspect/#devices
function getSubscription(username) {
    Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
    });

    return navigator.serviceWorker.ready.then(function (registration) {
        console.log('Registration successful, scope is:', registration.scope);
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
    });
}

function subscribeUser(username) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (reg) {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)

            }).then(function (sub) {
                var conSub = JSON.parse(JSON.stringify(sub));
                console.log(conSub);
                console.log(sub);
                console.log(sub.toJSON);
                sendSubscriptionToBackEnd(sub.endpoint, '', username);
            }).catch(function (e) {

                if (Notification.permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                } else {
                    console.error('Unable to subscribe to push', e);
                }
            });
        })
    }
}

async function sendSubscriptionToBackEnd(endPoint, auth, username) {
    try {
        const response = await axios.post('https://paffwithme.herokuapp.com/notification/subscribe', {
            username: username,
            endpoint: endPoint,
            authKey: auth
        });
        console.log(response);
        if (!response.data.success) {
            throw new Error('Bad status code from server.');
        } else {
            return response.json();
        }

    } catch (error) {
        throw new Error('Bad response from server.' + error);
    }
};

export { getSubscription };


