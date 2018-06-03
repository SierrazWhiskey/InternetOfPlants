import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from './logo.svg';
import './App.css';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

// 
// function DeviceCard(props) {
//   const { classes } = props;
//
//   return (
//   );
// }
//
// DeviceCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


class App extends Component {
  state = {devices: []}

   componentDidMount() {
     fetch('/devices')
       .then(res => res.json())
       .then(devices => this.setState({ devices }));
   }

   render() {
     return (
       <div className="App">
         <h1>Devices</h1>
         {this.state.devices.map(device =>
           <div>
             <Card className={this.props.classes.card}>
               <CardContent>
                 <Typography className={this.props.classes.title} color="textSecondary">
                   Device
                 </Typography>
                 <Typography variant="headline" component="h2">
                   {device.nicename} ({device.id})
                 </Typography>
                 <Typography className={this.props.classes.pos} color="textSecondary">
                   ONLINE/OFFLINE
                 </Typography>
                 <Typography component="p">
                   LATEST DATA
                 </Typography>
               </CardContent>
               <CardActions>
                 <Button size="small">View Data</Button>
               </CardActions>
             </Card>
           </div>
       )}
     </div>
     );
   }
}

export default withStyles(styles)(App);
