import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {DeviceMetadata, DeviceGraph} from './Device'

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
  card: {
    minWidth: 275,
    width: '60vw',
    margin: '0px 20px',
    marginLeft  : 'auto',
    marginRight : 'auto',
  },
  cardContent: {
    height: '20vw'
  },
  moreButton: {
    marginTop: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'left'
  },
};

class DeviceCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      device: props.device,
      classes: props.classes
    };
  }

  render () {
    const classes = this.state.classes;
    const device = this.state.device;
    if (!device) {
        return <div />
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container className={classes.deviceRow} justify="center" spacing={24}>
            <Grid item className={classes.cardContent} xs={12} sm={4}>
              <Typography className={classes.title} variant="headline" component="h2">
                {device.nicename}
              </Typography>
              <DeviceMetadata device={device} classes={classes}/>
              <Button
                component={Link}
                to={"/devices/" + device.id}
                size="small" color="primary" className={classes.moreButton}>
                View Raw Data
              </Button>
            </Grid>

            <Grid item xs={12} sm={8}>
              <DeviceGraph device={device} classes={classes} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

}

export default withStyles(styles)(DeviceCard);
