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
        throw new Error('Bad response from server. Error:' + error);
    }
};
export { sendPushtoAll };