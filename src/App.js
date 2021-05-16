import React, { useEffect, useState } from 'react';
import Drawer from './Layout/Drawer';
import { UserContext } from './Data/UserContext';
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
        isLoggedIn: false,
        isLoading: false,
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
                            <div style={{ height: '100vH', position: 'fixed', background: '#311d3f' }}>
                                <Drawer />
                            </div>
                        )}
                    </div>
                )}
        </UserContext.Provider>
    );
}

