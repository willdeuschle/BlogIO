import React from 'react';
import {
    TabBarIOS,
} from 'react-native';
import Styles from './Styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorScheme } from '../../static/statics.js'

export default class BlogIOTabBar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: "signal"
        };
    }

    render() {
        return (
            <TabBarIOS
                style={Styles.tabBar}
                barTintColor="black"
                unselectedTintColor="white"
                tintColor={colorScheme}
                itemPositioning="fill"
            >

                <Icon.TabBarItem
                    title="Trending"
                    iconName="signal"
                    selectedIconName="signal"
                    selected={this.state.selectedTab == "signal"}
                    onPress={() => {
                        this.setState({
                            selectedTab: "signal"
                        });
                    }}
                >
                    {this.props.renderView("Trending")}
                </Icon.TabBarItem>

                <Icon.TabBarItem
                    title="Search"
                    iconName="search"
                    selectedIconName="search"
                    selected={this.state.selectedTab == "search"}
                    onPress={() => {
                        this.setState({
                            selectedTab: "search"
                        });
                    }}
                >
                    {this.props.renderView("Search")}
                </Icon.TabBarItem>

            </TabBarIOS>
        )
    }
}
