import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import DevicePage from './components/DevicePage'
import DevicesPage from './components/DevicesPage'
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#69f0ae',
    },
    secondary: {
      main: '#f069ab',
    },
  },
});

const styles = {
  root: {
    flexGrow: 1,
  },
  deviceRow: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
};

class App extends Component {

   render() {
     const classes = this.props.classes;
     return (
       <Router>
         <div className="App">
           <CssBaseline />
           <MuiThemeProvider theme={theme}>

           <Route exact={true} path="/" render={() => (
             <DevicesPage classes={classes} />
           )}/>

           <Route exact={true} path="/devices" render={() => (
             <DevicesPage classes={classes} />
           )}/>

           <Route exact={true} path="/devices/:deviceId" render={(props) => (
             <DevicePage classes={classes} {...props}/>
           )}/>
         </MuiThemeProvider>
       </div>
     </Router>
     );
   }
}


export default withStyles(styles)(App);
