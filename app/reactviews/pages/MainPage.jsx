import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import {cyan500 as colorCyan, white as colorWhite} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconShare from 'material-ui/svg-icons/social/share';
import IconFace from 'material-ui/svg-icons/action/face';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconMood from 'material-ui/svg-icons/social/mood';
import IconGroup from 'material-ui/svg-icons/social/group';
import IconVolumeUp from 'material-ui/svg-icons/av/volume-up';
import IconColorLens from 'material-ui/svg-icons/image/color-lens';
import IconChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import Carousel from 'nuka-carousel'

import MainLayout from '../components/MainLayout'

// App component - represents the whole app
export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let features = [
      { title:'Emoji',
        subtitle: 'Emoticons, one tap away.',
        icon: (<IconMood color={colorCyan}/>),
      },
      { title:'Stickers',
        subtitle: 'Stupendous life-saving stickers.',
        icon: (<IconFace color={colorCyan}/>),
      },
      { title:'Theme',
        subtitle: 'For you and made by YOU.',
        icon: (<IconColorLens color={colorCyan}/>),
      },
      { title:'Settings',
        subtitle: 'More to explore.',
        icon: (<IconSettings color={colorCyan}/>),
      },
      { title:'Theme Sharing',
        subtitle: 'More Sharing, more happy.',
        icon: (<IconShare color={colorCyan}/>),
      },
      { title:'Sound Effects',
        subtitle: 'Hear as you click.',
        icon: (<IconVolumeUp color={colorCyan}/>),
      },
      { title:'Rate',
        subtitle: 'Rate your favorites.',
        icon: (<IconFavorite color={colorCyan}/>),
      },
      { title:'User Forum',
        subtitle: 'All queries answered.',
        icon: (<IconGroup color={colorCyan}/>),
      },

    ];

    let decorators = [
      {
        component: React.createClass({
          render() {
            return (
              <IconButton
                iconStyle={styles.decoratorsIconStyle}
                style={styles.decoratorsButtonStyle}
                onClick={this.props.previousSlide} >
              <IconChevronLeft color={colorCyan}/>
              </IconButton>
            )
          }
        }),
        position: 'CenterLeft',
      },
      {
        component: React.createClass({
          render() {
            return (
              <IconButton
                iconStyle={styles.decoratorsIconStyle}
                style={styles.decoratorsButtonStyle}
                onClick={this.props.nextSlide} >
                <IconChevronRight color={colorCyan}/>
              </IconButton>
            )
          }
        }),
        position: 'CenterRight',
      }
    ];



    return (
      <MainLayout userAgent={this.props.foo.userAgent}>
      <div className="container" >

        <div style={styles.coverContainerStyle}>
          <img style={{width:'30%'}} src={'Icon.png'} />
          <div style={styles.coverTextStyle}>Sticker & Emoji Keyboard for Gen Z</div>
          <div style={styles.coverItemStyle}>
            <a href=' https://itunes.apple.com/au/app/touchberry-key-sticker-emoji-keyboard/id1189737224?mt=8'>
              <RaisedButton label="Download" secondary={true} />
            </a>
          </div>
          <br/>
        </div>
        <br/>


        <Carousel style={styles.carouselStyle}
            swiping={false}
            wrapAround={true}
            decorators={decorators}>
          <img src="slide1.jpg" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
          <img src="slide2.jpg" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
          <img src="slide3.jpg" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
          <img src="slide4.jpg" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
          <img src="slide5.jpg" onLoad={() => {window.dispatchEvent(new Event('resize'));}}/>
        </Carousel>

        <br/>

        {features.map((oneItem, i) => {
          return (
            <Card key={i}>
                <CardHeader
                  title= {oneItem.title}
                  subtitle={oneItem.subtitle}
                  avatar={oneItem.icon}
                />
            </Card>
          ) } )
        }

        <br/>


      </div>

    </MainLayout>
    );
  }
}


MainPage.propTypes = {
  foo: React.PropTypes.object
};

const styles = {
  decoratorsButtonStyle:{
    width: 72,
    height: 72,
    padding:16,
  },
  decoratorsIconStyle:{
    width: 36,
    height: 36,
    borderStyle: 'solid',
    'borderColor':colorCyan,
    borderRadius: 24,
  },
  coverContainerStyle: {
    display: 'flex',
    display: '-webkit-flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems:'center',
    backgroundColor: colorCyan,
  },
  carouselContainerStyle: {
    flex: 1,
    display: 'flex',
    display: '-webkit-flex',
  },

  carouselStyle: {
    padding: 16
  },

  coverItemStyle:{
    //padding: 5,
    //width: '540',
    //height: '120',
    //margin:5,
  },
  coverTextStyle:{
    margin:32,
    fontFamily: 'Roboto, sans-serif',
    fontSize:18,
    color: colorWhite,
  },
  contentTextStyle: {
    fontFamily: 'Roboto, sans-serif',
    marginLeft:5,
    marginRight:5,
    textAlign:'justify'
  },
}
