import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import {cyan500 as colorCyan, white as colorWhite} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';

import MainLayout from '../components/MainLayout'


// App component - represents the whole app
export default class PrivacyPolicyPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <MainLayout userAgent={this.props.foo.userAgent}>
      <div style={styles.contentTextStyle}>

          <h2>Touchberry Key Privacy Policy</h2>
          <p>Touchberry Inc. (“us”, “we”, or “our”) operates the Touchberry Key iOS application (“this app”).</p>
          <p>This page informs you of our policies regarding the collection, use and disclosure of your personal health record (“PHR Data”) when you use this app.</p>
          <p>By using this app, you agree to the collection and use of information in accordance with this policy.</p>

          <h2>Information Collection And Use</h2>
          <p>We do not collect PHR Data from your Fitbit; they’re securely stored on your device; they will not be sent to our server.</p>
          <p>We will not share your PHR Data with anyone.</p>
          <p>We will not sell your PHR Data to advertising platforms, data brokers or information resellers.</p>
          <p>We will not use Your PHR Data for advertising or similar services.</p>

          <h2>Security</h2>
          <p>The security of your information is important to us, but remember that no method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.</p>

          <h2>Changes To This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          <p>We will not change this agreement to allow the collection of your PHR Data or make other significant changes without your consent.</p>

          <h2>Disclaimers</h2>
          <p>We make no guarantees as to the suitability of this app for the user, or for any of its functionality, product price, accuracy, or usefulness, and will not be held responsible in the event that damage is incurred.</p>
          <p>We reserve the right to change this app or to stop offering it. We will not be held responsible if this app is discontinued, changed, or otherwise made unusable and data is damaged or lost as a result, or if the device itself is damaged, or if the device incurred damage due to another app.</p>
      </div>
      </MainLayout>
    );
  }
}

const styles = {
  contentTextStyle: {
    fontFamily: 'Roboto, sans-serif',
    marginLeft:5,
    marginRight:5,
    textAlign:'justify'
  },
}
