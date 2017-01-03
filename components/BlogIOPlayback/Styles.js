import { StyleSheet } from 'react-native';
import { colorScheme } from '../../static/statics.js';

const Styles = StyleSheet.create({
    blogIOPlayback: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    header: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323232',
    },
    titleHeader: {
        flex: 0.6,
        marginLeft: 8,
        marginRight: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: colorScheme,
        borderBottomWidth: 2,
    },
    titleText: {
        marginLeft: 8,
        fontSize: 20,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 40/2,
    },
    authorHeader: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    authorText: {
        fontSize: 15,
        color: 'white',
    },
    scrollViewBounds: {
        flex: 0.55,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 8,
        marginRight: 8,
    },
    withBorder: {
        borderBottomColor: colorScheme,
        borderBottomWidth: 2,
    },
    articleText: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    controls: {
        flex: 0.20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonView: {
        height: 75,
        width: 75,
        borderRadius: 75/2,
        borderColor: colorScheme,
        backgroundColor: colorScheme,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        color: 'black',
        fontSize: 80,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    pauseButton: {
        color: 'black',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 80,
    },
    refresh: {
        color: colorScheme,
        fontSize: 40,
    },
    caretTop: {
        color: colorScheme,
        fontSize: 48,
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: -6,
    },
    caretBottom: {
        color: colorScheme,
        fontSize: 48,
        backgroundColor: 'rgba(0,0,0,0)',
        marginTop: -6,
    },
    hidden: {
        fontSize: 40,
        color: 'rgba(0,0,0,0)',
    },
    toggleSpeed: {
        marginTop: -3,
        flex: 0.33,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    speedText: {
        color: 'white',
    },
    farRight: {
        flex: 0.33,
    },
    loadingText: {
        color: 'white',
        marginTop: 16,
    },
})

export default Styles
