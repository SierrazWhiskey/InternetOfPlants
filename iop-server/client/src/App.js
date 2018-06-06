import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import PersistentDrawer from './components/Navigation'
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
               <PersistentDrawer title="Devices">
                 <DevicesPage classes={classes} />
               </PersistentDrawer >
             )}/>

             <Route exact={true} path="/devices" render={() => (
               <PersistentDrawer title="Devices">
                 <DevicesPage classes={classes} />
               </PersistentDrawer >
             )}/>

             <Route exact={true} path="/devices/:deviceId" render={(props) => (
               <PersistentDrawer title="Device">
                 <DevicePage classes={classes} {...props}/>
               </PersistentDrawer >
             )}/>

         </MuiThemeProvider>
       </div>
     </Router>
     );
   }
}

export default withStyles(styles)(App);
