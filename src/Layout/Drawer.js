import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from "@material-ui/core/Toolbar";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { BsGearFill, BsPlus, BsList } from 'react-icons/bs';
import { GoSignOut } from "react-icons/go";
import { Route, Switch, Link, BrowserRouter as Router, Redirect } from 'react-router-dom';

import BottomTab from './BottomTab';
import Settings from '../Pages/Settings';
import Customize from '../Pages/Customize';
import { Avatar, Box, Grid, SwipeableDrawer } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors'
import { UserContext } from '../Data/UserContext';

//https://developer.mozilla.org/de/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'fixed',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    appBarHeader: {
        height: '5vH'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundColor: theme.palette.secondary.dark,
        width: drawerWidth,
    },
    content: {
        position: "fixed",
        flexGrow: 1,
    },
    drawerBottom: {

        position: "fixed",
        bottom: 0,
        paddingBottom: 10,

    },
    logoutBtn: {
        paddingBottom: 10,
    },
    logoutText: {
        paddingTop: 5,
    },
    profileArea: {
        paddingTop: 15,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    username: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    profileInfo: {
        width: '100%',
    }
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { userStore, setUserStore } = useContext(UserContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const doLogout = () => {
        console.log('loggedOut');
        setUserStore({
            username: '',
            isLoogedIn: false,
        });
        <Redirect to='/' />
    };

    const firstLetter = userStore.username.charAt(0).toUpperCase();

    const drawer = (
        <div>
            <div className={classes.profileArea}>
                <Avatar alt="profileAvatar" className={classes.avatar}
                    component='div'>
                    <Typography variant="h2">
                        {firstLetter}
                    </Typography>
                </Avatar>
                <Typography variant="h4" className={classes.username}>
                    {userStore.username}
                </Typography>

                {/*
                <div className={classes.profileInfo}>
                    <Grid
                        container
                        direction="column"
                        justify="space-around"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={12}
                            container
                            direction='row'
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={6}>
                                <Box border={1}>
                                    <Typography>
                                        Smoked Pipes
                        </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box border={1}>
                                    <Typography>
                                        Friends online
                        </Typography>
                                </Box>

                            </Grid>
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction='row'
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={6}>
                                <Box border={1}>
                                    <Typography>
                                        {50}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box border={1}>
                                    <Typography>
                                        {2}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                
                </div>
                */}
            </div>
            <Divider />
            <List>
                {['settings', 'customize', 'djf', 'sdf'].map((text, index) => (
                    <ListItem button key={text} component={Link} to={'/' + text}>
                        <ListItemIcon>{index % 2 === 0 ? <BsGearFill size={30} /> : <BsPlus size={30} />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>


            <div className={classes.drawerBottom}>
                <Divider style={{ width: 240 }} />
                <IconButton
                    color="inherit"
                    aria-label="logout"
                    edge="end"
                    className={classes.logoutBtn}
                    onClick={() => doLogout()}
                >
                    <GoSignOut />
                </IconButton>
                <Typography variant="h6" noWrap
                    className={classes.logoutText}>
                    Logout
                </Typography>
            </div>
        </div >
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <BsList />
                    </IconButton>
                    <Typography variant="h5" noWrap
                        className={classes.appBarHeader}>
                        Paff with me
                    </Typography>
                </Toolbar>
            </AppBar>
            <Router>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <SwipeableDrawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path='/' component={BottomTab} />
                        <Route path='/settings' component={Settings} />
                        <Route path='/customize' component={Customize} />
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default ResponsiveDrawer;
