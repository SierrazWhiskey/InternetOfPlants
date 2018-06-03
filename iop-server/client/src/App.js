import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
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
  card: {
    minWidth: 275,
    maxWidth: 800,
    margin: '0px 20px',
    marginLeft  : 'auto',
    marginRight : 'auto'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  online: {
    float: 'right',
    backgroundColor: '#08ce97',
  },
  offline: {
    float: 'right',
  }
};


function OnlineChip(props) {
  const isOnline = props.device.online;
  if (isOnline) {
    return <Chip className={props.classes.online} label="Online"/>
  }
  return <Chip className={props.classes.offline} label="Offline"/>
}


class App extends Component {
  state = {devices: []}

   componentDidMount() {
     fetch('/devices')
       .then(res => res.json())
       .then(devices => this.setState({ devices }));
   }

   render() {
     console.log(this.props.classes);
     return (
       <div className="App">
         <CssBaseline />
         <MuiThemeProvider theme={theme}>

         <h1>Devices</h1>
         {this.state.devices.map(device =>
           <div key={device.id} id={"device" + device.id}>
             <Card className={this.props.classes.card}>
               <CardContent>
                 <Typography variant="headline" component="h2">
                   {device.nicename}
                   <OnlineChip device={device} classes={this.props.classes}/>
                 </Typography>

                 <Typography className={this.props.classes.deviceProperty} color="textSecondary">
                   id: {device.id}
                 </Typography>
                 <Typography component="p">
                   DATA GRAPH
                 </Typography>
               </CardContent>
               <CardActions>
                 <Button size="small" color="primary" >View Raw Data</Button>
               </CardActions>
             </Card>
           </div>
       )}
       </MuiThemeProvider>
     </div>
     );
   }
}

export default withStyles(styles)(App);
