import axios from 'axios';
var fileDownload = require('js-file-download');

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
    }
    ));

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
export function getLive(username) {
    return axios.post('https://paffwithme.herokuapp.com/smokingData/getLive', {
        username: username
    })
        .then(res => res.data)
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        });
}
export function uploadFile(file, username) {
    let formData = new FormData();
    formData.append("storie", file, username);
    formData.append("name", username);
    console.log(formData);
    return axios.post('http://localhost:3003/stories/upload', formData //https://paffwithme.herokuapp.com/stories/upload
        , { headers: { "Content-Type": "multipart/form-data", } });
}

export function getFile(username) {
    return axios.post('http://localhost:3003/stories/get', {
        username: username
    }, { responseType: 'blob' })
        .then((res) => {
            console.log(res);
            if (res.data.type.toLowerCase().indexOf('json') != -1) {
                console.log('hi');
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.onload = () => {
                        res.data = JSON.parse(reader.result);
                        console.log(res.data);
                        resolve(res.data);

                    };
                    reader.onerror = () => {
                        reject(res);
                    };
                    reader.readAsText(res.data);
                }).then((data) => {
                    console.log()
                    return data;
                })
            } else {
                console.log(res);
                console.log(res.data);
                return res.data;
            }

        })
        .catch((err) => {
            console.log(err);
            throw new Error(err);
        });
}


