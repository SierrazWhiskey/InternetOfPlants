import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#61ffc8',
      main: '#08ce97',
      dark: '#009c69',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffbdff',
      main: '#ff8bd6',
      dark: '#ca5aa5',
      contrastText: '#000000',
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
    maxWidth: 800,
    margin: '0px 20px',
    marginLeft  : 'auto',
    marginRight : 'auto'
  },
  title: {
    marginBottom: 8,
    textAlign: 'left'
  },
  deviceInfoTable: {
    marginTop: 0,
    paddingTop: 0

  },
  online: {
    float: 'right',
    backgroundColor: '#08ce97',
  },
  offline: {
    float: 'right',
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
  var date = new Date();
  return (
    <Table className={classes.deviceInfoTable}>
      <TableBody>
        <TableRow key={device.id}>
          <TableCell component="th" scope="row">
          id
          </TableCell>
          <TableCell numeric>{device.id}</TableCell>
        </TableRow>
        <TableRow key={device.id}>
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
  var device = props.device;
  var classes = props.classes;
  return (
    <Typography component="p">
      DATA GRAPH
    </Typography>
  )
}

function DeviceCard(props) {
  var device = props.device;
  var classes = props.classes;

  return (
  <div key={device.id} id={"device" + device.id}>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="headline" component="h2">
          {device.nicename}
          <OnlineChip device={device} classes={classes}/>
        </Typography>

        <Grid container className={classes.deviceRow} justify="center" spacing={20}>
          <Grid item xs={12} sm={3}>

            <DeviceInfo device={device} classes={classes}/>
          </Grid>

          <Grid item xs={12} sm={9}>

            <DeviceGraph device={device} classes={classes}/>
          </Grid>

        </Grid>

      </CardContent>
      <CardActions>
        <Button size="small" color="primary" style={{flex: 4}} >View Raw Data</Button>
      </CardActions>
    </Card>
  </div>
  )
}

class App extends Component {
  state = {devices: []}

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
           <Grid container className={classes.deviceRow} justify="center" spacing={20}>
             {this.state.devices.map(device =>
              <Grid item xs={12}>
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