import React, { useState } from 'react';
import Drawer from './Layout/Drawer';
import { UserContext, AlertContext } from './Data/Contexts';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Loading from './Pages/Loading';


export default function App() {
    const [userStore, setUserStore] = useState({
        username: '',
        isLoggedIn: true, //
        isLoading: false,
    });
    const [alert, setAlert] = useState({
        isAlert: false,
        status: '', //error,success,warning, info
        message: ''
    });
    return (
        <UserContext.Provider value={{ userStore, setUserStore }}>
            {userStore.isLoading ?
                (<Loading />) :
                (
                    <div>
                        {!userStore.isLoggedIn ? (
                            <Router>
                                <Route exact path='/' component={SignIn} />
                                <Route path='/signup' component={SignUp} />
                            </Router >

                        ) : (
                            <AlertContext.Provider value={{ alert, setAlert }}>
                                <div style={{ height: '100vH', position: 'fixed', background: '#311d3f' }}>
                                    <Drawer />
                                </div>
                            </AlertContext.Provider>
                        )}
                    </div>
                )}
        </UserContext.Provider>
    );
}

