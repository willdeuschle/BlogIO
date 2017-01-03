/*
 * Will Deuschle
 * BlogIO
 * 2017
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    NavigatorIOS,
    StatusBar,
} from 'react-native';
import TrendingView from './components/TrendingView/TrendingView.js';
import SearchView from './components/SearchView/SearchView.js';
import BlogIOTabBar from './components/BlogIOTabBar/BlogIOTabBar.js';
import { colorScheme } from './static/statics.js'


export default class BlogIO extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle={'light-content'}
                />
                <NavigatorIOS
                    barTintColor={'black'}
                    tintColor={colorScheme}
                    initialRoute={{ component: BlogIOComponent, title: "Back" }}
                    navigationBarHidden={true}
                    style={{flex: 1}}
                />
            </View>
        )
    }
}


class BlogIOComponent extends React.Component {
    renderView = (currentView) => {
        if (currentView == "Trending") {
            return (
                <TrendingView nav={this.props.navigator} />
            )
        }
        else if (currentView == "Search") {
            return (
                <SearchView nav={this.props.navigator} />
            )
        }
    }

    render() {
        return (
            <View style={Styles.container}>
                <BlogIOTabBar renderView={this.renderView} />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
    },
});

AppRegistry.registerComponent('BlogIO', () => BlogIO);
