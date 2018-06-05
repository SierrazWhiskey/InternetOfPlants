import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';

import DeviceCard from './DeviceCard'

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


class DevicesPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      devices: [],
      classes: props.classes
    };
  }

  componentWillMount() {
    fetch('/devices')
      .then(res => res.json())
      .then(devices => this.setState({ devices }));
  }

  render () {
    const classes = this.state.classes;
    const devices = this.state.devices;
    if (!devices) {
        return <div />
    }

    return(
      <div>
        <h1>Devices</h1>
        <Grid container className={classes.deviceRow} justify="center" spacing={24}>
        {devices.map(device =>
           <Grid item xs={12} key={"deviceCard" + device.id}>
             <DeviceCard  device={device} classes={classes}/>
           </Grid>
        )}
       </Grid>
     </div>
    )
  }
}

export default withStyles(styles)(DevicesPage);
