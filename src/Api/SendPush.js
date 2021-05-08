import axios from 'axios';

export async function sendPushtoAll(pushUsername, pushStartTime, pushEndTime, pushLocation) {

    await axios.post('https://paffwithme.herokuapp.com/notification/sendtoAll', {
        username: pushUsername,
        location: pushLocation,
        startTime: pushStartTime,
        endTime: pushEndTime
    }).then((res) => {
        if (res.data.success) {
            console.log('Push worked');
            return true;
        }
        else {
            console.log('Push NOT worked');
            return false;
        }
    })
}
