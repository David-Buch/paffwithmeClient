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
import { getUser } from './Helpers/Api';
import Cookies from 'universal-cookie';

export default function App() {
    const [userStore, setUserStore] = useState({
        username: '',
        isLoggedIn: false,
        isLoading: false,
    });
    const [alert, setAlert] = useState({
        isAlert: false,
        status: '', //error,success,warning, info
        message: ''
    });
    useEffect(() => {
        const cookie = new Cookies().get('userID');
        console.log(cookie);
        if (cookie) {
            setUserStore({
                username: cookie,
                isLoggedIn: true, //
                isLoading: false,
            })
        }
        /*
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
                        console.log(res.message);
                    }
        
                });
                */
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

