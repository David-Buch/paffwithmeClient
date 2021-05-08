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
    type: 'dark',
    primary: {
      main: '#88304e',

    },
    secondary: {
      light: '#311d3f',
      main: '#e23e57',
      dark: '#311d3f',
    },

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
