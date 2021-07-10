import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';



const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1F1946', //blue
      light: '#60DFE6',// light blue
    },
    secondary: {
      main: '#F27450', // orange
      light: '#1FBBE3' //baby blue
    },
    background: {
      default: '#E5F9E7', //greenish
      paper: '#ffffff'
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    }
  },
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
