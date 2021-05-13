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

async function loginUser(username, password) {
    try {
        const response = await axios.post(('https://paffwithme.herokuapp.com/login'),
            {
                username: username,
                password: password
            });
        if (response.data.success) {
            return response.data;
        } if (response.data.message) {
            console.log(response.data.message);
            return response.data;
        }

    } catch (error) {
        console.log(error)
    }
}

async function signupUser(username, password) {
    try {
        const response = await axios.post(('https://paffwithme.herokuapp.com/register'),
            {
                username: username,
                password: password
            })
        if (response.data.success) {
            return response.data;
        } if (response.data.message) {
            console.log(response.data.message);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export { sendPushtoAll, loginUser, signupUser };