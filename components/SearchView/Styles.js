import { StyleSheet } from 'react-native';
import { colorScheme } from '../../static/statics.js';

const Styles = StyleSheet.create({
    searchView: {
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
    textInputSection: {
        flex: 0.10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textInput: {
        flex: 0.8,
        height: 40,
        borderWidth: 0.1,
        borderRadius: 4,
        marginLeft: 8,
        marginRight: 8,
        padding: 8,
        fontSize: 18,
        backgroundColor: 'white',
    },
    body: {
        backgroundColor: 'white',
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 49,
        borderTopColor: 'black',
        borderTopWidth: 0.5,
    },
});

export default Styles
