import { StyleSheet } from 'react-native';
import { colorScheme } from '../../static/statics.js';

const Styles = StyleSheet.create({
    trendingView: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
    headerText: {
        marginTop: 6,
        fontSize: 36,
        color: colorScheme,
        fontWeight: '200',
    },
    body: {
        backgroundColor: 'white',
        flex: 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 49,
        borderTopColor: 'black',
        borderTopWidth: 0.5,
    },
});

export default Styles
