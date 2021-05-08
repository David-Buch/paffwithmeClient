import React, { useState } from 'react';
import Drawer from './Layout/Drawer';
import { UserContext } from './Data/UserContext';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { getSubscription } from './PushNotification/PushNotification'

export default function App() {
    const [userStore, setUserStore] = useState({
        username: 'moin',
        isLoggedIn: true,
    });


    // PushNotification 
    //Subcription
    if (userStore.isLoggedIn && userStore.username !== '') {
        console.log('hi');
        getSubscription(userStore.username);
    }


    return (
        <UserContext.Provider value={{ userStore, setUserStore }}>
            {!userStore.isLoggedIn ? (
                <Router>
                    <Route exact path='/' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                </Router >

            ) : (
                <div style={{ height: '100vH', background: '#311d3f' }}>
                    <Drawer />
                </div>
            )}
        </UserContext.Provider>
    );
}
