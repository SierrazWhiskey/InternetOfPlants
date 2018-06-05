import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import DeviceCard from './components/DeviceCard'

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
  state = {devices: []};

   componentDidMount() {
     fetch('/devices')
       .then(res => res.json())
       .then(devices => this.setState({ devices }));
   }

   render() {
     var classes = this.props.classes;
     return (
       <div className="App">
         <CssBaseline />
         <MuiThemeProvider theme={theme}>

         <h1>Devices</h1>
           <Grid container className={classes.deviceRow} justify="center" spacing={24}>
             {this.state.devices.map(device =>
              <Grid item xs={12} key={"deviceCard" + device.id}>
              <DeviceCard  device={device} classes={classes}/>
              </Grid>
           )}
        </Grid>
       </MuiThemeProvider>
     </div>
     );
   }
}

export default withStyles(styles)(App);
