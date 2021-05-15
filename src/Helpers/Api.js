import axios from 'axios';

export function sendPushtoAll(pushUsername, pushStartTime, pushEndTime, pushLocation) {

    return axios.post('https://paffwithme.herokuapp.com/notification/sendtoAll', {
        username: pushUsername,
        location: pushLocation,
        //startTime: pushStartTime,
        //endTime: pushEndTime
    }).then((response) => {
        console.log(response);
        if (response.data.success) {
            console.log('Push worked');
            return response;
        }
        else { console.log('Push NOT worked'); }
    }).
        catch((error) => {
            console.log(error);
            //throw new Error('Bad response from server. Error:' + error);
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
