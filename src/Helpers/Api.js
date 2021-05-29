import axios from 'axios';

export function sendPushtoAll(pushUsername) {
    return axios.post('https://paffwithme.herokuapp.com/notification/sendtoAll', {
        username: pushUsername,
    }).then((response) => {
        if (response.data.success) {
            console.log('Push worked');
            return response;
        }
        else { console.log('Push NOT worked'); }
    })
        .catch((error) => {
            console.log(error);
            throw new Error('Bad response from server. Error:' + error);
        });
}
export function sendPushtoOne(fromUser, toUser, delay) {
    return axios.post('https://paffwithme.herokuapp.com/notification/sendtoOne', {
        from: fromUser,
        to: toUser,
        delay: delay
    }).then((response) => {
        if (response.data.success) {
            console.log('Push worked');
            return response;
        }
        else { console.log('Push NOT worked'); }
    })
        .catch((error) => {
            console.log(error);
            throw new Error('Bad response from server. Error:' + error);
        });
}
export function loginUser(username, password) {
    return axios.post('https://paffwithme.herokuapp.com/user/login', //'http://localhost:3003/user/login'
        {
            username: username,
            password: password

        }, { withCredentials: true }).then(res => res.data)
        .catch(error => {
            console.log(error);
            return error;
        });
}

export function signupUser(username, password) {
    return axios.post('https://paffwithme.herokuapp.com/user/register',
        {
            username: username,
            password: password
        }).then(res => res.data)
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });
}

export function getSmokeData(username) {
    return axios.post('https://paffwithme.herokuapp.com/smokingData/get', {
        username: username
    })
        .then(res => res.data)
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        });
}

export function sendSmokeData(username, location, startTime, endTime, color) {

    console.log(JSON.stringify({
        username: username,
        color: color,
        location: location,
        startTime: startTime,
        endTime: endTime
    }));

    return axios.post('https://paffwithme.herokuapp.com/smokingData/send', {
        username: username,
        color: color,
        location: location,
        startTime: startTime,
        endTime: endTime
    }).then(res => res.data)
        .catch(error => {
            console.log(error);
            return error;
        });
}
export function getUser() {
    return axios.get('https://paffwithme.herokuapp.com/user/login', {
        withCredentials: true
    })
        .then(res => res.data)
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });
}
export function UserlogOut(username) {
    return axios.post('https://paffwithme.herokuapp.com/user/logout', {
        username: username
    }, { withCredentials: true }).then(res => res.data)
        .catch(error => {
            console.log(error);
            return error;
        });
}
