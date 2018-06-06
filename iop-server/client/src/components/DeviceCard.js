import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {FlexibleXYPlot,
        XAxis,
        YAxis,
        HorizontalGridLines,
        VerticalGridLines,
        LineSeries,
        DiscreteColorLegend} from 'react-vis';

const MSEC_DAILY = 86400000;

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
  title: {
    marginBottom: 8,
    textAlign: 'left'
  },
  deviceInfoTable: {
    marginTop: 0,
    paddingTop: 0
  },
  moreButton: {
    marginTop: 20,
  },
  online: {
    float: 'left',
    backgroundColor: theme.palette.primary.main,
  },
  offline: {
    float: 'left',
  },
};


function OnlineChip(props) {
  const isOnline = props.device.online;
  if (isOnline) {
    return <Chip className={props.classes.online} label="Online"/>
  }
  return <Chip className={props.classes.offline} label="Offline"/>
}

function DeviceInfo(props) {
  var device = props.device;
  var classes = props.classes;
  return (
    <Table className={classes.deviceInfoTable}>
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row">
          Status
          </TableCell>
          <TableCell>
          <OnlineChip device={device} classes={classes}/>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
          Last Update
          </TableCell>
          <TableCell numeric>
          {device.last_update}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function DeviceGraph(props) {
  const timestamp = new Date('September 9 2017').getTime();

  return (
    <FlexibleXYPlot xType="time" style={{marginBottom:-14}}>
        <DiscreteColorLegend orientation="horizontal"
         items={['temperature', 'humidity']}/>

         <HorizontalGridLines style={{stroke: '#B7E9ED'}}/>
         <VerticalGridLines style={{stroke: '#B7E9ED'}}/>
         <XAxis title="Day" tickTotal={4} style={{
           line: {stroke: '#ADDDE1'},
           ticks: {stroke: '#ADDDE1'},
           text: {stroke: 'none', fill: '#6b6b76', fontWeight: 300, fontSize:12}
         }}/>
         <YAxis title="Measurement"/>
         <LineSeries
           className="temperature"
           data={[
             {x: timestamp + MSEC_DAILY, y: 3},
             {x: timestamp + MSEC_DAILY * 2, y: 5},
             {x: timestamp + MSEC_DAILY * 3, y: 15},
             {x: timestamp + MSEC_DAILY * 4, y: 12}
           ]}
           style={{
             strokeLinejoin: 'round',
             strokeWidth: 4
           }}
         />
         <LineSeries
           className="humidity"
           curve={'curveMonotoneX'}
           strokeDasharray="3 4"
           data={[
             {x: timestamp + MSEC_DAILY, y: 10},
             {x: timestamp + MSEC_DAILY * 2, y: 4},
             {x: timestamp + MSEC_DAILY * 3, y: 2},
             {x: timestamp + MSEC_DAILY * 4, y: 15}
           ]}
           />
    </FlexibleXYPlot>
  )
}

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
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container className={classes.deviceRow} justify="center" spacing={24}>
            <Grid item className={classes.cardContent} xs={12} sm={4}>
              <Typography className={classes.title} variant="headline" component="h2">
                {device.nicename}
              </Typography>
              <DeviceInfo device={device} classes={classes}/>
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
    </div>
    )
  }

}

export default withStyles(styles)(DeviceCard);
