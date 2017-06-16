import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {cyan500 as colorCyan, white as colorWhite} from 'material-ui/styles/colors'

import Footer from './Footer';


const styles = {
  appBar: {
    position: 'fixed', //Use fixed to Fix AppBar on the top, also disable rubber
                       // band effect
    top: 0,
    left: 0,
    right: 0,
    //height: 64,
    zIndex:1000       //Make sure this is on the top layer
  },
  appBarPadding: {
    height: 64,
    backgroundColor: colorCyan
  },
}

//lightMuiTheme.userAgent = req.headers['user-agent'];
//console.log(lightMuiTheme);

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    lightBaseTheme.userAgent = this.props.userAgent;
    let lightMuiTheme = getMuiTheme(lightBaseTheme);

    return (
      <MuiThemeProvider muiTheme={lightMuiTheme} >
        <div style={bodyStyle}>
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>

           <AppBar
             style={styles.appBar}
             onLeftIconButtonTouchTap = { () => this.refs.refLeftNav._handleToggle() }
             zDepth={0}
             title="Touchberry Key"
           />
           <div style={styles.appBarPadding}></div>
        {this.props.children}
        <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }
};


const bodyStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
    margin: 0,
  };
