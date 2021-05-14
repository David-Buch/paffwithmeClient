import axios from 'axios';

async function sendPushtoAll(pushUsername, pushStartTime, pushEndTime, pushLocation) {
    try {
        const response = await axios.post(('https://paffwithme.herokuapp.com/notification/sendtoAll'), {
            username: pushUsername,
            location: pushLocation,
            startTime: pushStartTime,
            endTime: pushEndTime
        });
        console.log(response);
        if (response.data.success) {
            console.log('Push worked');
            return response;
        }
    } catch (error) {
        console.log(error);
        //throw new Error('Bad response from server. Error:' + error);
    }
}
export function loginUser(username, password) {
    return axios.post('https://paffwithme.herokuapp.com/user/login',
        {
            username: username,
            password: password
        }).then(res => res.data)
        .catch(error => {
            console.log(error);
            throw new Error(error);
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

export { sendPushtoAll };