import React from 'react';
import {
    View,
    Text,
    TextInput,
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
const { urls_endpoint, api_key } = require('../../static/statics.js');

export default class SearchView extends React.Component {
    constructor() {
        super();
        this.state = {
            trendingUrls: [],
            articleLoading: false,
        };
    }

    search(searchText) {
        this.setState({articleLoading: true});
        fetch(urls_endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-Api-Key': api_key,
            },
            body: JSON.stringify({
                search_term: searchText
            })
        })
            .then((response) => response.json())
            .then((trendingUrls) => this.setState({trendingUrls: trendingUrls, articleLoading: false}))
            .catch((error) => this.setState({articleLoading: false}));
    }

    render() {
        return (
            <View style={Styles.searchView}>
                <View style={Styles.header}>
                    <Text style={Styles.headerText}>
                        Search
                    </Text>
                </View>
                <View style={Styles.textInputSection}>
                    <TextInput
                        style={Styles.textInput}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor={'dimgray'}
                        clearTextOnFocus={false}
                        clearButtonMode={'always'}
                        placeholder={'Search for articles...'}
                        returnKeyType={"search"}
                        onSubmitEditing={(e) => this.search(e.nativeEvent.text)}
                    />
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
