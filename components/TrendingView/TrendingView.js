import React from 'react';
import {
    View,
    Text,
    ListView,
    TouchableHighlight,
} from 'react-native';

let originalDefaultProps = Text.defaultProps;
Text.defaultProps = function() {
    return {
        ...originalDefaultProps(),
        allowFontScaling: false,
    }
}

import Styles from './Styles.js';
import ArticleList from '../ArticleList/ArticleList.js';
const { urls_endpoint, api_key } = require('../../static/statics.js')

export default class TrendingView extends React.Component {
    constructor() {
        super();
        this.state = {
            trendingUrls: [],
            articleLoading: true,
        };
    }

    componentDidMount() {
        fetch(urls_endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-Api-Key': api_key,
            },
            body: JSON.stringify({
                search_term: null
            })
        })
            .then((response) => response.json())
            .then((trendingUrls) => this.setState({trendingUrls: trendingUrls, articleLoading: false}))
            .catch((error) => this.setState({articleLoading: false}));
    }

    render() {
        return (
            <View style={Styles.trendingView}>
                <View style={Styles.header}>
                    <Text style={Styles.headerText}>
                        Trending
                    </Text>
                </View>
                <View style={Styles.body}>
                    <ArticleList
                        nav={this.props.nav}
                        trendingUrls={this.state.trendingUrls}
                        articleLoading={this.state.articleLoading}
                    />
                </View>
            </View>
        )
    }
}
