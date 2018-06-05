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


class DevicePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      device: null,
      classes: props.classes,
      deviceId: props.match.params.deviceId
    };
  }

  componentWillMount() {
    fetch('/devices')
      .then(res => res.json())
      .then(devices => {
        const device = devices.filter( d => { return d.id===Number(this.state.deviceId)})[0];
        this.setState({ device })
      } );
  }

  render () {
    const classes = this.state.classes;
    const device = this.state.device;
    if (!device) {
        return <div />
    }

    return(
      <div>
        <h1>{device.nicename}</h1>
         <DeviceCard device={device} classes={classes}/>
     </div>
    )
  }
}

export default withStyles(styles)(DevicePage);
