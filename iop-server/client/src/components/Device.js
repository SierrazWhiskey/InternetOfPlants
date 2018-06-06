import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';


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
  title: {
    marginBottom: 8,
    textAlign: 'left'
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
  deviceMetaTable: {
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 8,
    minHeight: '5vh'
  },
  deviceDataTable: {
    marginTop: 20,
    paddingTop: 0
  },
  deviceDataTableHead: {
    backgroundColor: theme.palette.secondary.main,
  },
  deviceDataTableHeadCell: {
    fontSize: '16px',
    fontWeight: 800,
    color: theme.palette.secondary.contrastText,
  },
  deviceGraph: {
    minHeight: '20vh',
    height: '100%',
    marginBottom: '20px'
  },
  online: {
    float: 'left',
    backgroundColor: theme.palette.primary.light,
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

class DeviceMetadata extends Component {

  constructor(props){
    super(props);
    this.state = {
      device: props.device,
      classes: props.classes,
      deviceData: props.deviceData
    };
  }

  render () {
    var device = this.state.device;
    var classes = this.state.classes;
    return (
      <Table className={classes.deviceMetaTable}>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
            Status
            </TableCell>
            <TableCell numeric>
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
}

class DeviceGraph extends Component {

  constructor(props){
    super(props);
    this.state = {
      device: props.device,
      classes: props.classes,
      deviceData: props.deviceData
    };
  }

  render () {
    var classes = this.state.classes;
    const timestamp = new Date('September 9 2017').getTime();

    return (
      <FlexibleXYPlot xType="time" className={classes.deviceGraph}>
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
}

class DeviceDataTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      device: props.device,
      classes: props.classes,
      deviceData: props.deviceData
    };
  }

  render () {
    var device = this.state.device;
    var classes = this.state.classes;
    var deviceData = this.state.deviceData;

    if (!device || !deviceData ) {
        return <div />
    }

    return (
      <Table className={classes.deviceDataTable}>
        <TableHead className={classes.deviceDataTableHead}>
          <TableRow>
          {Object.keys(deviceData[0]).map(key =>
             <TableCell className={classes.deviceDataTableHeadCell} key={key}>
             {key.split(' ').map ( ([h, ...t]) => h.toUpperCase() + t.join('').toLowerCase() )}
             </TableCell>
          )}
          </TableRow>
        </TableHead>

        <TableBody>
          {deviceData.map(dataRow =>
            <TableRow key={dataRow.timestamp}>
            {Object.keys(dataRow).map(key =>
               <TableCell key={key}>
                {dataRow[key]}
               </TableCell>
            )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}

DeviceMetadata = withStyles(styles)(DeviceMetadata);
DeviceGraph = withStyles(styles)(DeviceGraph);
DeviceDataTable = withStyles(styles)(DeviceDataTable);

export {DeviceMetadata,
        DeviceGraph,
        DeviceDataTable,
       }
