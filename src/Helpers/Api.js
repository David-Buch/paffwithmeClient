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
export function loginUser(username, password) {
    return axios.post('https://paffwithme.herokuapp.com/user/login',
        {
            username: username,
            password: password
        }).then(res => res.data)
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

export function sendSmokeData(username, location, startTime, endTime) {

    console.log(JSON.stringify({
        username: username,
        location: location,
        startTime: startTime,
        endTime: endTime
    }));

    return axios.post('https://paffwithme.herokuapp.com/smokingData/send', {
        username: username,
        location: location,
        startTime: startTime,
        endTime: endTime
    }).then(res => res.data)
        .catch(error => {
            console.log(error);
            return error;
        });
}
