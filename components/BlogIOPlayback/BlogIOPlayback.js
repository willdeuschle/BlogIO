import React from 'react';
import {
    View,
    Text,
    Navigator,
    TouchableHighlight,
    Image,
    ScrollView,
    AppState,
} from 'react-native';
import MusicControl from 'react-native-music-control';

let originalDefaultProps = Text.defaultProps;
Text.defaultProps = function() {
    return {
        ...originalDefaultProps(),
        allowFontScaling: false,
    }
}

import Styles from './Styles.js';
import { page_endpoint, api_key } from '../../static/statics.js';
import Icon from 'react-native-vector-icons/FontAwesome';
var Speech = require('react-native-speech');

export default class BlogIOPlayback extends React.Component {
    constructor() {
        super();
        this.state = {
            articleText: "",
            playing: 'initial',
            readingSpeed: '1.0',
        }
    }

    componentDidMount() {
        // stop anything currently playing
        Speech.stop();

        // add event listener for AppState changes
        AppState.addEventListener('change', this._handleAppStateChange);

        // fetch the next article
        fetch(page_endpoint, {
            method: 'POST',
            headers: {
                'X-Api-Key': api_key,
            },
            body: JSON.stringify({
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'url': this.props.url,
            }),
        })
            .then((response) => response.json())
            .then((articleText) => {
                if (typeof articleText != 'string') {
                    throw Error("No Text")
                } else {
                    this.setState({ articleText })
                }
            })
            .catch((error) => {
                this.setState({articleText: "Sorry, there was a problem processing this article, and we're working on it.."})
            })

        // setup the lock screen controls
        MusicControl.enableBackgroundMode(true);

        MusicControl.enableControl('play', true);
        MusicControl.enableControl('pause', true);

        MusicControl.on('play', () => {
            if (this.state.playing == 'initial') {
                this.setState({playing: 'playing'});
                this._startSpeech();
            } else {
                this.setState({playing: 'playing'})
                this._resumeSpeech();
            }
        })

        MusicControl.on('pause', () => {
            this.setState({playing: 'paused'})
            this._pauseSpeech();
        })

    }

    togglePlaying = () => {
        if (this.state.playing == 'initial') {
            this.setState({playing: 'playing'});
            this._startSpeech();
        } else if (this.state.playing == 'playing') {
            this.setState({playing: 'paused'});
            this._pauseSpeech();
            MusicControl.resetNowPlaying();
        } else {
            this.setState({playing: 'playing'});
            this._resumeSpeech();
            MusicControl.setNowPlaying({
                title: this.props.title,
                artwork: '',
            });
        }
    }

    // rate is between 0.5 and 3.0, I convert it here and allow for [0.4, 0.9]
    _startSpeech() {
        if (this.state.articleText) {
            Speech.speak({
                text: this.state.articleText,
                voice: 'en-US',
                rate: 0.50 + ((parseFloat(this.state.readingSpeed) - 1) / 5),
            });
        }

        MusicControl.setNowPlaying({
            title: this.props.title,
            artwork: '',
        });

        this._toClear = setInterval(() => {
            Speech.isFinished()
                .then(response => this._handleFinished(response))
                .catch(err => console.log(err))
        }, 5000)

    }

    _handleFinished(finished) {
        // need to check the status of playing so that locking of the phone
        // while speech is paused doesn't cause us weirdness
        // where speech thinks it is finished
        if (finished && this.state.playing == 'playing') {
            this._resetSpeech();
            MusicControl.resetNowPlaying();
        }
    }

    _resetSpeech = () => {
        Speech.stop();
        clearInterval(this._toClear);
        this.setState({playing: 'initial'});
    }

    _pauseSpeech() {
        Speech.pause();
    }

    _resumeSpeech() {
        Speech.resume();
    }

    // if we open up the app again and playing is paused, stop the speech from
    // playing again
    _handleAppStateChange = (currentAppState) => {
        if (this.state.playing == 'paused') {
            Speech.pause();
        }
    }

    componentWillUnmount() {
        Speech.stop();
        clearInterval(this._toClear);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    changeReadingSpeed = (direction) => {
        if (direction) {
            let nextSpeed = parseFloat(this.state.readingSpeed) + 0.25
            if (nextSpeed <= 3.0) {
                this.setState({readingSpeed: nextSpeed.toFixed(2)});
            }
        } else {
            nextSpeed = parseFloat(this.state.readingSpeed) - 0.25
            if (nextSpeed >= 0.5) {
                this.setState({readingSpeed: nextSpeed.toFixed(2)});
            }
        }
    }

    displayMetaControls() {
        if (this.state.playing == 'initial') {
            return (
                <View style={Styles.toggleSpeed}>
                    <Icon name={"caret-up"} onPress={() => this.changeReadingSpeed(true)} style={Styles.caretTop}/>
                    <Text style={Styles.speedText}>
                        {this.state.readingSpeed}x
                    </Text>
                    <Icon name={"caret-down"} onPress={() => this.changeReadingSpeed(false)} style={Styles.caretBottom}/>
                </View>
            )
        } else {
            return (
                <View style={Styles.toggleSpeed}>
                    <Icon name={"refresh"} onPress={() => this._resetSpeech()} style={Styles.refresh}/>
                </View>
            )
        }
    }

    displayControls() {
        if (this.state.articleText) {
            if (this.state.playing == 'playing') {
                return (
                    <View style={Styles.controls}>
                        {this.displayMetaControls()}
                        <View style={Styles.buttonView}>
                            <Icon name="pause-circle" style={Styles.pauseButton} onPress={this.togglePlaying} />
                        </View>
                        <View style={Styles.farRight}>
                            <Icon name={"refresh"} style={Styles.hidden}/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={Styles.controls}>
                        {this.displayMetaControls()}
                        <View style={Styles.buttonView}>
                            <Icon name="play-circle" style={Styles.playButton} onPress={this.togglePlaying} />
                        </View>
                        <View style={Styles.farRight}>
                            <Icon name={"refresh"} style={Styles.hidden}/>
                        </View>
                    </View>
                )
            }
        }
        else {
            return (
                <View/>
            )
        }
    }

    displayScrollView = () => {
        if (this.state.articleText) {
            return (
                <View style={[Styles.scrollViewBounds, Styles.withBorder]}>
                    <ScrollView
                        style={Styles.articleText}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}
                    >
                        <Text style={{color: 'white'}}>
                            {this.state.articleText}
                        </Text>
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={Styles.scrollViewBounds}>
                    <Text style={Styles.loadingText}>
                        Loading...
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={Styles.blogIOPlayback}>
                <View style={[{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight + 10}, Styles.header]}>
                    <View style={Styles.titleHeader}>
                        <Image
                            style={Styles.avatar}
                            source={{uri: this.props.avatar}}
                        />
                        <Text style={Styles.titleText}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={Styles.authorHeader}>
                        <Text style={Styles.authorText}>
                            by {this.props.author}
                        </Text>
                    </View>
                </View>
                {this.displayScrollView()}
                {this.displayControls()}
            </View>
        )
    }
}
