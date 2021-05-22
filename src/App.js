import React, { useEffect, useState } from 'react';
import Drawer from './Layout/Drawer';
import { UserContext, AlertContext } from './Data/Contexts';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Loading from './Pages/Loading';
import { getUser, setAxiosCredentials } from './Helpers/Api';
import axios from 'axios';


export default function App() {
    const [userStore, setUserStore] = useState({
        username: '',
        isLoggedIn: false, //
        isLoading: false,
    });
    const [alert, setAlert] = useState({
        isAlert: false,
        status: '', //error,success,warning, info
        message: ''
    });
    axios.defaults.withCredentials = true;
    useEffect(() => {

        getUser().then((res) => {
            console.log(res);
            if (res.success) {
                setUserStore({
                    username: res.username,
                    isLoggedIn: true, //
                    isLoading: false,
                })
            }
            else {
                setAlert({
                    isAlert: true,
                    status: 'warning',
                    message: res.message
                })
            }

        });
    }, [])
    return (
        <UserContext.Provider value={{ userStore, setUserStore }}>
            <AlertContext.Provider value={{ alert, setAlert }}>
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

                                <div style={{ height: '100vH', position: 'fixed', background: '#311d3f' }}>
                                    <Drawer />
                                </div>

                            )}
                        </div>
                    )}
            </AlertContext.Provider>
        </UserContext.Provider >
    );
}

