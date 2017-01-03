import React from 'react';
import {
    ListView,
    TouchableHighlight,
    View,
    Text,
    Image,
} from 'react-native';

let originalDefaultProps = Text.defaultProps;
Text.defaultProps = function() {
    return {
        ...originalDefaultProps(),
        allowFontScaling: false,
    }
}

import Styles from './Styles.js';
import BlogIOPlayback from '../BlogIOPlayback/BlogIOPlayback.js';

export default class ArticleList extends React.Component {
    constructor() {
        super();
        this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this._ds.cloneWithRows([])
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({dataSource: this._ds.cloneWithRows(newProps.trendingUrls)})
    }

    // want to cut off any unreasonably long titles
    formatTitle = (title) => {
        if (!title) {
            return 'Untitled'
        }
        if (title.length > 120) {
            return `${title.substr(0, 120)}...`
        } else {
            return title
        }
    }

    render() {
        if (this.props.articleLoading) {
            return (
                <View style={Styles.emptyRow}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }
        if (this.props.trendingUrls.length == 0) {
            return (
                <View style={Styles.emptyRow}>
                    <Text>
                        No matching articles.
                    </Text>
                </View>
            )
        }
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <TouchableHighlight
                        style={Styles.listRow}
                        onPress={() => this.props.nav.push({
                            component: BlogIOPlayback,
                            navigationBarHidden: false,
                            passProps: {
                                url: rowData['url'],
                                title: rowData['title'],
                                author: rowData['author'],
                                avatar: rowData['avatar'],
                            },
                        })}
                    >
                        <View style={Styles.articleContainer}>
                            <Image
                                style={Styles.avatar}
                                source={{uri: rowData['avatar']}}
                            />
                            <Text style={Styles.title}>
                                {this.formatTitle(rowData['title'])}
                            </Text>
                        </View>
                    </TouchableHighlight>
                }
            />
        )
    }
}
