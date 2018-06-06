import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {DeviceMetadata, DeviceGraph, DeviceDataTable} from './Device'

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
    width: '20vw',
    maxWidth: '800px',
    marginTop: '8vw',
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
      deviceData: null,
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
       })
      .then( () => {
        fetch('/devices/' + this.state.device.id)
          .then(res => res.json())
          .then(deviceData => {
              this.setState({ deviceData })
            })
        });
  }

  render () {
    const classes = this.state.classes;
    const device = this.state.device;
    const deviceData = this.state.deviceData;
    if (!device || !deviceData) {
        return <div />
    }

    return(
      <Paper className={classes.root}>
          <Grid container className={classes.deviceRow} justify="center" spacing={24}>
            <Grid item className={classes.cardContent} xs={12} sm={4}>
              <Typography className={classes.title} variant="headline" component="h2">
                {device.nicename}
              </Typography>
              <DeviceMetadata device={device} classes={classes}/>
            </Grid>

            <Grid item xs={12} sm={8}>
              <DeviceGraph device={device} classes={classes} />
            </Grid>

            <DeviceDataTable device={device} deviceData={deviceData} classes={classes}/>

          </Grid>
      </Paper>

    )
  }
}

export default withStyles(styles)(DevicePage);
