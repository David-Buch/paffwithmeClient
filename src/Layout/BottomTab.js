import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { GiSmokingPipe } from 'react-icons/gi';
import { GoHome } from "react-icons/go";
import { BsList } from "react-icons/bs";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import Home from '../Pages/Home';
import Live from '../Pages/Live';
import Stats from '../Pages/Stats';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '10vh',
        position: 'fixed',
        left: 0,
        bottom: 0,
        backgroundColor: theme.palette.secondary.light,
        color: 'red',
        borderTopRightRadius: '15%',
        borderTopLeftRadius: '15%',
    },
    paper: {
        backgroundColor: theme.palette.primary.light
    },
    navPoints: {
        color: 'black',
    }
}));


export default function BottomTab(props) {
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const routes = ['/home', '/live', '/stats'];



    return (
        <Router>
            <Route path='/'> {//auf home aendern
            }
                <Paper className={classes.paper}>
                    <BottomNavigation
                        //selectedIndex={this.state.selectedIndex}
                        value={value}
                        onChange={(e, newValue) => { setValue(newValue) }}
                        className={classes.root}
                        showLabels
                    >
                        <BottomNavigationAction
                            className={classes.navPoints}
                            component={Link}
                            to={routes[0]}
                            label="Home"
                            value={routes[0]}
                            icon={< GoHome size='30' />}
                        />
                        <BottomNavigationAction
                            className={classes.navPoints}
                            component={Link}
                            to={routes[1]}
                            label="Live"
                            value={routes[1]}
                            icon={< GiSmokingPipe size='30' />}
                        />
                        <BottomNavigationAction
                            className={classes.navPoints}
                            component={Link}
                            to={routes[2]}
                            label="Stats"
                            value={routes[2]}
                            icon={< BsList size='30' />} />
                    </BottomNavigation>
                </Paper>
            </Route>
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/live' component={Live} />
                <Route path='/stats' component={Stats} />
            </Switch>
        </Router>
    );
}